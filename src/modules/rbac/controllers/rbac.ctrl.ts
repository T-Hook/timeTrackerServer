import { NextFunction, Request, Response } from 'express';
import { default as RbacService } from '../services/rbac.srvc';
import { User } from '../../user/models/user';
import { Rbac } from '../models/rbac';
import { default as PermissionService } from '../services/permission.srvc';


class RbacController {
    async getAll(req: Request, resp: Response) {
        try {
            const rbacs = await RbacService.findAll(req.user);
            resp.status(200).send(rbacs);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async saveRbac(req: Request, res: Response, next: NextFunction) {
        try {
            const rbac: Rbac = req.body;
            const rbacs = await RbacService.save(rbac);
            res.send({
                msg: 'save rbac',
                data: rbac,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 201
            });
        } catch (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        }
    }
    async getRules(req: Request, res: Response, next: NextFunction) {
        try {
            const rbacs = await RbacService.getRules();
            res.send({
                msg: 'save rbac',
                data: rbacs,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 201
            });
        } catch (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        }
    }
    addPermissionToRbac(req: Request, resp: Response) {
        try {
            const rbac = req.params.idrbac, permission = req.params.idpermission;
            RbacService.findById(rbac).then(res => {
                res.permissions.push(permission);
                RbacService.updatePermission(rbac, res.permissions).then(res => {
                    resp.send({
                        msg: 'update rbac',
                        data: res,
                        url: req.protocol + '://' + req.get('host') + req.originalUrl,
                        status: 201
                    });
                });
            });
        } catch (error) {
            resp.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        }
    }

    deletePermissionFromRbac(req: Request, resp: Response) {
        try {
            const rbac = req.params.idrbac, permission = req.params.idpermission;
            RbacService.findById(rbac).then(res => {
                res.permissions.splice(res.permissions.indexOf(permission), 1);
                RbacService.updatePermission(rbac, res.permissions).then(res => {
                    resp.send({
                        msg: 'update rbac',
                        data: res,
                        url: req.protocol + '://' + req.get('host') + req.originalUrl,
                        status: 201
                    });
                });
            });
        } catch (error) {
            resp.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        }
    }
}

export default new RbacController();