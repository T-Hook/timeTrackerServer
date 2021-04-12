import { NextFunction, Request, Response } from 'express';
import { default as TrackingService } from '../services/tracking.srvc';
import { User } from '../../user/models/user';
import { Tracking } from '../models/tracking';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class TrackingController {
    async getAll(req: Request, resp: Response) {
        try {
            const trackings = await TrackingService.findAll();
            resp.status(200).send(trackings);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const tracking = await TrackingService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(tracking);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const tracking = await TrackingService.findOneById( req.params.id);
            resp.status(200).send(tracking);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async saveTracking(req: Request, res: Response, next: NextFunction) {
        try {
            const tracking: Tracking = req.body;
            tracking.idUser = req.user._id;
            const trackings = await TrackingService.save(tracking);
            res.send({
                msg: 'save tracking',
                data: trackings,
                status: 201
            });
        } catch (error) {
            console.log(error);
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }
}

export default new TrackingController();
