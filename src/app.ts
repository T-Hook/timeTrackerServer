import * as express from 'express';
import * as compression from 'compression';  // compresses requests
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as lusca from 'lusca';
import * as dotenv from 'dotenv';
import * as mongo from 'connect-mongo';
import * as mongoose from 'mongoose';
import * as expressValidator from 'express-validator';
import * as bluebird from 'bluebird';
import * as expressJwt from 'express-jwt';
import { default as TokenService } from './modules/authentication/services/token.srvc';
import { default as RbacService } from './modules/rbac/services/rbac.srvc';
import * as jwt from 'jsonwebtoken';
import { Token } from './modules/authentication/models/token';
import { User } from './modules/user/models/user';
import { default as UserService } from './modules/user/services/user.srvc';
import * as useragent from 'express-useragent';

const listEndpoints = require('express-list-endpoints');
const acl = require('express-acl');
// acl.config({
//     filename: 'acl.json',
//     path: 'config',
//     // roleSearchPath: 'user.role',
// });

const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: '.env' || '.env.example'});

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = process.env.MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    },
).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
});
app.use(useragent.express());
// Express configuration
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
        ttl: 2 * 24 * 60 * 60
    })
}));

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,Authorization, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    // next();
    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }

});
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());


app.use(expressJwt({
        secret: process.env.JWT_SECRET,
        requestProperty: 'auth',
        getToken: function (req: express.Request) {
            const role = 'guest';
            const tokenHeader = req.headers.Authorization || req.headers.authorization || req.query.authorization
                || req.query.Authorization;
            if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
                if (req.session) {
                    req.session.role = role;
                }
                const _tokenHeader = (tokenHeader as string).split(' ')[1];
                return _tokenHeader;
            }
        }
    })
        .unless({path: [/\/api-docs\//g, {url: '/', method: 'OPTIONS'}, /\/auth\//g, /\/auth\//g]})
);

app.use(async (err, req, resp, next) => {
    const sortVar = {};
    if (req.query.sort) {
        sortVar[req.query.sort] = -1;
    }
    const option = {
        sort: sortVar,
        page: parseInt(req.query.page) || 0,
        // offset: parseInt(req.query.offset) || null,
        limit: parseInt(req.query.limit) || 20
    };
    req.__filter = option;
    /**
     * @description: get rules from database
     * @type {string | string[]}
     */
    const rulesList = await RbacService.getRules();
    acl.config({
        // filename: 'acl.json',
        // path: 'config',
        rules: rulesList
    });
    const tokenHeader = req.headers.Authorization || req.headers.authorization || req.query.authorization
        || req.query.Authorization;
    if (tokenHeader) {
        const _tokenHeader = (tokenHeader as string).split(' ')[1];
        let payload;
        try {
            payload = jwt.decode(_tokenHeader, process.env.JWT_SECRET);
        } catch (err) {
            return resp.status(401).send({error: 'TokenInvalid'});
        }
        const savedToken: Token = await TokenService.findToken(_tokenHeader);
        if (!savedToken) {
            resp.status(401).send({
                msg: 'Invalid or no token supplied ',
                code: 401,
                error: 2
            });
            return;
        } else {
            const user: User = await UserService.findByEmailAndCompany(payload.email, payload.company);
            if (user) {
                req.params.__TokenHeader = _tokenHeader;
                req.params.__payload = payload;
                req.user = user;
                if (req.session) {
                    req.session.role = user.role;
                }
                next();
            } else {
                resp.status(498).send({
                    msg: 'session expired or invalid token .  ',
                    code: 498,
                    error: 4
                });
            }
        }
    } else {
        if (req.session) {
            req.session.role = 'guest';
        }
        next();
    }
});
app.use(acl.authorize.unless({
    path: ['/auth/mail', '/useragent', /\/useragent\//g, '/auth/register', 'auth/updatepassword', /\/api-docs\//g, /\/auth\//g,
        {url: '*', method: 'OPTIONS'}, {url: '*', method: 'OPTIONS'}, '/auth/login', '/api-docs/']
}));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        next();
    }
});
/**
 * Modules Routes
 * TODO Add a script that can be add router based in a config file for each module in modules
 */

require('./modules/core.modules')(app);
require('./plugins/plugins.modules')(app);
app.use(function (req: express.Request, resp: express.Response, next: express.NextFunction) {
    next();
});
app.use((req: express.Request, resp: express.Response) => {
    resp.status(404).send({
        msg: 'Not Found!',
        code: 404
    });
});


module.exports = app;
