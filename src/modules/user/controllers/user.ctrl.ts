import { Request, Response } from 'express';
import { default as UserService } from '../services/user.srvc';
import { default as ProfileService } from '../services/profile.srvc';
import { SuccessResponse } from '../../../components/successResponse';
import * as _ from 'lodash';
import { CompanyUser } from '../../company/models/companyUser';
import { default as CompanyUserService } from '../../company/services/companyUser.srvc';
import { User } from '../models/user';
class UserController {
    async saveUser(req: Request, resp: Response) {
        try {
            const user: User = req.body;
            const users = await UserService.save(user);
            resp.send({
                msg: 'user saved',
                data: users,
                status: 201
            });
        }
        catch (error) {
            resp.send({
                msg: 'error',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const user = await UserService.findOneById(req.params.id);
            resp.status(200).send(user);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async update(req: Request, resp: Response) {
        const user: User = req.body;
        // @ts-ignore
        user._id = req.params.id;
        try {
            const __user = await UserService.findOneById(req.params.id);
            // @ts-ignore
            if (!__user._id) {
                resp.send({
                    msg: 'not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _u = await UserService.updateUser(req.params.id, user);
                resp.send({
                    msg: 'updated',
                    data: _u,
                    status: 201
                });
            }
        } catch (e) {
            resp.send({
                msg: 'error',
                data: e,
                status: 500
            });
        }
    }

    async delete(req: Request, resp: Response) {
        const user: User = req.body;
        // @ts-ignore
        user._id = req.params.id;
        try {
            const _user = await UserService.deleteOneById(req.params.id);
            resp.send({
                msg: 'User deleted',
                data: _user,
                status: 201
            });
        } catch (e) {
            resp.send({
                msg: 'error',
                data: e,
                status: 500
            });
        }
    }
    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const user = await UserService.findOneByIdAndOwnerId(req.user);
            resp.status(200).send(user);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findprofile(req: Request, resp: Response) {
        try {
            const task = await UserService.findOneByIdAndOwner(req.user);
            resp.status(200).send(task);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAll(req: Request, resp: Response) {
        try {
            const users = await UserService.findAll();
            const response = [];
            users.forEach(omitUser);

            function omitUser(item, index) {
                item = _.omit(item.toObject(), ['password', 'activationToken', 'activationExpires']);
                response.push(item);
            }

            resp.status(200).send(response);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getSpecificUserForUserWithShowAccess(req: Request, resp: Response) {
        try {
            const companies = await UserService.findBySpecificAccessAndUserId(
                req.user._id,
                ['get'],
            );
            resp.status(200).send(companies);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getProfile(req: Request, resp: Response) {
        const me = _.omit(req.user.toObject(), ['password', 'activationToken', 'activationExpires']);
        if (req.get('companyId')) {
            const CompanyI = await CompanyUserService.findBySpecificAccessUserIdAndCompanyId(
                // @ts-ignore
                req.user._id,
                ['get'],
                req.user.companyId
            );
            const companies = CompanyI.filter(function (company) {
                return !!company.idCompany;
            });
            if (companies.length) {
                me.companies = companies;
            }
        }
        const respM: SuccessResponse = new SuccessResponse(req, resp, 200, me);
        respM.sendStatus(resp);
    }

    async getAllProfile(req: Request, resp: Response) {
        try {
            const users = await ProfileService.findAll();
            resp.status(200).send(users);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllProfilespecific(req: Request, resp: Response) {
        try {
            const users = await UserService.find();
            resp.status(200).send(users);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
}

export default new UserController();
