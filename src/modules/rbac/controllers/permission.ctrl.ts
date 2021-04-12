import { Permission } from './../models/permission';
import { NextFunction, Request, Response } from 'express';
import { default as PermissionService } from '../services/permission.srvc';
import { SuccessResponse } from '../../../components/successResponse';


class PermissionController {
    async getAll(req: Request, resp: Response) {
        try {
            const per = await PermissionService.findAll();
            resp.status(200).send(per);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const per = await PermissionService.findOneById( req.params.id);
            resp.status(200).send(per);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async savePermission(req: Request, res: Response) {
        const permission: Permission = req.body;
        await PermissionService.save(permission).then(function (permission) {
            res.send({
                msg: 'save permission',
                data: permission,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 201
            });
        }).catch(function (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        });
    }

    putRouteToPermission(req: Request, resp: Response) {
        try {
            const route = req.params.idroute, permission = req.params.idpermission;
            PermissionService.findById(permission).then(res => {
                res.routes.push(route);
                PermissionService.updateRoutes(permission, res.routes).then(res => {
                    resp.send({
                        msg: 'update permission',
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
    deleteRouteFromPermission(req: Request, resp: Response) {
        try {
            const route = req.params.idroute, permission = req.params.idpermission;
            PermissionService.findById(permission).then(res => {
                res.routes.splice(res.routes.indexOf(route), 1);
                PermissionService.updateRoutes(permission, res.routes).then(res => {
                    resp.send({
                        msg: 'update permission',
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
    async delete(req: Request, resp: Response) {
        const permission: Permission = req.body;
        // @ts-ignore
        permission._id = req.params.id;
        try {
            const _permission = await PermissionService.deleteOneById(req.params.id);
            resp.send({
                msg: ' deleted',
                data: _permission,
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

}

export default new PermissionController();