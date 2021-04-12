import * as errorHandler from 'errorhandler';
import { default as RouteController } from './modules/rbac/controllers/route.ctrl';
import * as Fixtures from 'node-mongodb-fixtures';


const listEndpoints = require('express-list-endpoints');
const app = require('./app');
const fixter = process.env.RUN_FIXTER;
const runRoutes = process.env.INSERT_ROUTES;
const mongoUrl = process.env.MONGODB_URI;
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
    const endPointList = listEndpoints(app);
    let countRoute = 0;
    if (runRoutes === 'true') {
        endPointList.forEach(element => {
            element.methods.forEach(async method => {
                countRoute++;
                const isSaved = await RouteController.checkIfRouteExist(method + element.path);
                if (!isSaved) {
                    await RouteController.saveRoutesFromExpress({
                        name: method + element.path,
                        description: 'method : ' + method +
                            '\n path : ' + element.path,
                        url: element.path,
                        method: method,
                        data: '',
                        active: true
                    }).then();
                }
            });
        });
    }
    if (fixter === 'true') {


        const mongoOpts = {};
        // const mongoOpts = {
        //     ssl: true,
        //     sslValidate: true,
        //     sslCA: '',
        // };

        const fixtures = new Fixtures({
            dir: 'fixtures',
            filter: '.*' // optional
        });
        fixtures
            .connect(mongoUrl, mongoOpts)
            .then(() => fixtures.unload())
            .then(() => fixtures.load())
            .catch(console.error)
            .finally(() => fixtures.disconnect());
    }
    console.log(('  App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

export = server;
