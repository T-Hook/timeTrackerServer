import { NextFunction, Request, Response } from 'express';
import {default as NotificationService } from'../services/notification.srvc';
import { User } from '../../user/models/user';
import { Notification } from '../models/notification';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class NotificationController {
    async getAll(req: Request, resp: Response) {
        try {
            const notifications = await NotificationService.findAll();
            resp.status(200).send(notifications);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async update(req: Request, resp: Response) {
        const notification: Notification = req.body;
        // @ts-ignore
        notification._id = req.params.id;
        notification.idUser = req.user._id;
        try {
            const __notification = await NotificationService.findOneById(req.params.id);
            // @ts-ignore
            if (!__notification._id) {
                resp.send({
                    msg: 'notification not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _rule = await NotificationService.update(req.params.id, notification);
                resp.send({
                    msg: 'notification updated',
                    data: _rule,
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
        const notification: Notification = req.body;
        // @ts-ignore
        notification._id = req.params.id;
        notification.idUser = req.user._id;
        try {
            const _notification = await NotificationService.deleteOneById(req.params.id);
            resp.send({
                msg: 'notification deleted',
                data: _notification,
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
            const notification = await NotificationService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(notification);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const notification = await NotificationService.findOneById( req.params.id);
            resp.status(200).send(notification);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async save(req: Request, res: Response, next: NextFunction) {
        const notification: Notification = req.body;
        try {
            const notif = await NotificationService.save(notification);
            res.send({
                msg: 'save',
                data: notif,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 50023309523998555);
            errorResp.sendResponse(res);
        }
    }
}
export default new NotificationController();
