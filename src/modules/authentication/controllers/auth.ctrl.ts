import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import * as crypto from 'crypto';
import { User } from '../../user/models/user';
import { default as UserService } from '../../user/services/user.srvc';
import { default as ProfileService } from '../../user/services/profile.srvc';
import { default as TokenService } from '../services/token.srvc';
import { Token } from '../models/token';
import { SuccessResponse } from '../../../components/successResponse';
import { ErrorResponse } from '../../../components/errorResponse';
import { default as MailingService } from '../../mailing/services/mailing.srvc';
import * as _ from 'lodash';
import { default as CompanyUserService } from '../../company/services/companyUser.srvc';

const frontendUrl = process.env.FRONT_CLIENT_URL;

class AuthController {
    async verifyUser(req: Request, resp: Response, next: NextFunction) {
        const tokenHeader = req.headers.Authorization || req.headers.authorization || req.query.authorization
            || req.query.Authorization;
        if (!tokenHeader) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 401, {}, '',
                401213131321991239);
            errorResp.sendResponse(resp);
        } else {
            const _tokenHeader = (tokenHeader as string).split(' ')[1];
            let payload;
            try {
                payload = jwt.decode(_tokenHeader, process.env.JWT_SECRET);
                const savedToken: Token = await TokenService.findToken(_tokenHeader);
                if (!savedToken) {
                    const errorResp: ErrorResponse = new ErrorResponse(req, resp, 401, {}, '',
                        40121315544331991239);
                    errorResp.sendResponse(resp);
                    resp.end({});
                } else {
                    const user: User = await UserService.findByEmail(payload.email);
                    // @ts-ignore
                    const userId = user._id;
                    if (payload.company) {
                        const CompanyI = await CompanyUserService.findBySpecificAccessUserIdAndCompanyId(
                            userId,
                            ['get'],
                            payload.company
                        );
                        const companies = CompanyI.filter(function (company) {
                            return !!payload.company;
                        });
                        if (companies.length) {
                            // @ts-ignore
                            user.companyId = companies[0].idCompany._id;
                            user.companyUser = companies[0];
                        }
                    }
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, {});
                        errorResp.code = 4404;
                        errorResp.sendResponse(resp);
                    }
                }
            } catch (err) {
                const errorResp: ErrorResponse = new ErrorResponse(req, resp, 501, {}, '',
                    4012131333333239);
                errorResp.sendResponse(resp);
            }
        }

    }

    async loginWithCompany(req: Request, resp: Response) {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('company', 'Company cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        const errors = req.validationErrors();

        if (errors) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 406, errors, '', 4065);
            errorResp.sendResponse(resp);
        }
        try {
            const UserResult = await UserService.findByEmail(req.body.email);
            const user: User = UserResult;
            if (!user) {
                const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, errors, 'user not found ', 404952);
                errorResp.sendResponse(resp);
            } else {
                const isSamePass = await UserService.comparePassword(req.body.password, user.password);
                if (isSamePass) {

                    const CompanyI = await CompanyUserService.findOneBySpecificAccessUserIdAndCompanyName(
                        // @ts-ignore
                        UserResult._id,
                        ['get'],
                        req.body.company
                    );
                    const companies = CompanyI.filter(function (company) {
                        return !!company.idCompany;
                    });
                    // @ts-ignore
                    if (CompanyI && companies.length) {
                        const Payload = {
                            email: user.email,
                            role: user.role,
                            username: user.username,
                            // @ts-ignore
                            company: companies[0].idCompany._id
                        };
                        const token = jwt.sign(Payload, process.env.JWT_SECRET, {expiresIn: '48h'});
                        const tokenObject: Token = {
                            accessToken: token,
                            kind: 'bearer',
                            user: user
                        };
                        const savedToken: Token = await TokenService.save(tokenObject);
                        return resp.status(200).send({token: token});
                    } else {
                        const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, {}, 'Company not found', 40425232323);
                        errorResp.sendResponse(resp);
                    }

                } else {
                    const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, {}, 'User not found', 40425232323);
                    errorResp.sendResponse(resp);
                }
            }
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 400, error, '', 4065);
            errorResp.sendResponse(resp);
        }
    }

    async login(req: Request, resp: Response) {
        req.assert('email', 'Email is not valid').isEmail();
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.sanitize('email').normalizeEmail({gmail_remove_dots: false});

        const errors = req.validationErrors();

        if (errors) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 406, errors, '', 4065);
            errorResp.sendResponse(resp);
        }
        try {
            const UserResult = await UserService.findByEmail(req.body.email);
            const user: User = UserResult;
            if (!user) {
                const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, errors, 'user not found ', 404952);
                errorResp.sendResponse(resp);
            } else {
                const isSamePass = await UserService.comparePassword(req.body.password, user.password);
                if (isSamePass) {
                    // if (!user.active) {
                    //     const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, {}, 'your account is not activated yet ,we have sent you an email to activate your account ', 40425);
                    //     errorResp.sendResponse(resp);
                    // } else {
                    const Payload = {
                        email: user.email,
                        role: user.role,
                        username: user.username
                    };
                    const email = user.email;
                    const token = jwt.sign(Payload, process.env.JWT_SECRET, {expiresIn: '48h'});
                    const tokenObject: Token = {
                        accessToken: token,
                        kind: 'bearer',
                        user: user
                    };
                    const savedToken: Token = await TokenService.save(tokenObject);
                    return resp.status(200).send({token: token, email : email});
                    // }
                } else {
                    const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, {}, 'User not found', 40425232323);
                    errorResp.sendResponse(resp);
                }
            }
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 400, error, '', 4065);
            errorResp.sendResponse(resp);
        }
    }

    async register(req: Request, resp: Response, next: NextFunction) {
        req.assert('password', 'Password cannot be blank').notEmpty();
        req.assert('fname', 'First name must be specified').notEmpty();
        req.assert('lname', 'Last name must be specified').notEmpty();
        req.assert('username', 'Username must be specified').notEmpty();
        req.assert('position', 'Position must be specified').notEmpty();
        req.assert('speciality', 'Speciality must be specified').notEmpty();
      //  req.assert('role', 'Role must be specified').notEmpty();
        req.assert('email', 'Email is not valid').isEmail();
        req.sanitize('email').normalizeEmail({gmail_remove_dots: false});
        const errors = req.validationErrors();

        if (errors) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 400, errors, '', 4065);
            errorResp.sendResponse(resp);
        } else {
            req.body.profile = {
                fname: req.body.fname,
                lname: req.body.lname
            };
            const user: User = req.body;
            try {
                // Check if user already exists
                const existingUser = await UserService.findByUsernameOrEmail(user.username, user.email);
                if (existingUser) {
                    const errorResp: ErrorResponse = new ErrorResponse(req, resp, 409, {}, 'User already exists', 40955);
                    errorResp.sendResponse(resp);
                } else {
                    // Generate activation token
                    const qRandomBytes = (util as any).promisify(crypto.randomBytes);
                    const cryptedValue = await qRandomBytes(16);
                    user.activationToken = cryptedValue.toString('hex');
                    user.activationExpires = new Date(Date.now() + 3600000); // 1 hour
                    // TODO the role shoud be default value , the only one who can give or edit roles is the super user,
                    if (!user.role) {
                        user.role = 'user';
                    }
                    user.role = 'user';
                    // save profile before saving user
                    // TODO the role shoud be default value , the only one who can give or edit roles is the super user,
                    user.profile = await ProfileService.save(user.profile);
                    let savedUser: User = await UserService.save(user);
                    // TODO add condition to send verification mail wehn env is prod
                    // await MailingService.sendValidationMail(savedUser.email, savedUser.activationToken);
                    savedUser = _.omit(savedUser, ['password']);
                    const respM: SuccessResponse = new SuccessResponse(req, resp, 201, savedUser, 'user saved');
                    return respM.sendStatus(resp);
                }

            } catch (error) {
                // TODO create a custom function to display better the list of error that will be used by other controllers.
                const errorResp: ErrorResponse = new ErrorResponse(req, resp, 400, error, 'duplicate key error', 409855);
                errorResp.sendResponse(resp);
            }
        }
    }

    async updatePassword(req: Request, resp: Response) {
        req.assert('password1', 'password 1 cannot be blank').notEmpty();
        req.assert('password2', 'password 2 cannot be blank').notEmpty();
        req.assert('email', 'email cannot be blank').notEmpty();
        req.assert('token', 'email cannot be blank').notEmpty();
        if (req.body.password1 === req.body.password2) {
            const user: User = await UserService.findByEmailAndResetPassword(req.body.email,
                req.body.token);
            if (user) {
                user.password = req.body.password1;
                const user33 = await UserService.update(user);
                const respM: SuccessResponse = new SuccessResponse(req, resp, 201, [user33, user],
                    'rest password ', 200411765590);
                return respM.sendStatus(resp);
                // const user33: User = await UserService.updatePassword(req.body.password1 ,
                //     req.body.token);
                // bcrypt.genSalt(10, (err, salt) => {
                //     if (err) {
                //         const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, err,
                //             'user mot found ', 44444);
                //         errorResp.code = 4404;
                //         errorResp.sendResponse(resp);
                //     }
                //     bcrypt.hash(req.body.password, 'devsalt@#32323223', undefined, async (err: mongoose.Error, hash) => {
                //         if (err) {
                //             const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, err,
                //                 'user mot found ', 4499898444);
                //             errorResp.code = 4404;
                //             errorResp.sendResponse(resp);
                //         }
                //         const user33: User = await UserService.updatePassword(hash,
                //             req.body.token);
                //         const respM: SuccessResponse = new SuccessResponse(req, resp, 201, {},
                //             'rest password ', 200411765590);
                //         return respM.sendStatus(resp);
                //     });
                // });
            } else {
                const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, {},
                    'user not found ', 449989228444);
                errorResp.code = 4404;
                errorResp.sendResponse(resp);
            }
        } else {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, {},
                'error password  ', 4449888338444);
            errorResp.code = 4404;
            errorResp.sendResponse(resp);
        }

    }

    async updatePasswordRequest(req: Request, resp: Response) {
        req.assert('email', 'email cannot be blank').notEmpty();
        const qRandomBytes = (util as any).promisify(crypto.randomBytes);
        const cryptedValue = await qRandomBytes(16);
        const user: User = await UserService.findByEmail(req.body.email);
        if (user) {

            const resetPasswordToken = cryptedValue.toString('hex');
            const user3: User = await UserService.findOneAndUpdateResetToken(req.body.email, resetPasswordToken);
            await MailingService.sendResetPasswordMail(req.body.email, resetPasswordToken);
            const respM: SuccessResponse = new SuccessResponse(req, resp, 201, {}, 'rest password mail was send ', 200411765590);
            return respM.sendStatus(resp);
        } else {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 440, {},
                'user mot found ', 44444);
            errorResp.code = 4404;
            errorResp.sendResponse(resp);
        }
    }

    async activate(req: Request, resp: Response) {
        let token;
        try {
            const user: User = await UserService.findOneAndUpdate(req.params.activationToken);
            token = jwt.sign({
                email: user.email,
                role: user.role,
                username: user.username
            }, process.env.JWT_SECRET, {expiresIn: '1h'});
            const tokenObject: Token = {
                accessToken: token,
                kind: 'bearer',
                user: user
            };
            const savedToken: Token = await TokenService.save(tokenObject);
            // return resp.status(200).send({token: token});
            resp.status(200).redirect(frontendUrl + '?server=1&authorizationToken=' + token);
        } catch (error) {
            resp.status(301).redirect(frontendUrl + '?server=1&error=' + 1);
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 400, error, 'Activation token expired, please register again', 40025);
            errorResp.sendResponse(resp);
        }
    }

    async mail(req: Request, resp: Response) {

        return resp.status(200).send();
    }
}

export default new AuthController();
