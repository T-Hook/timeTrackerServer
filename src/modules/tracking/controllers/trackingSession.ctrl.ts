import { NextFunction, Request, Response } from 'express';
import { default as TrackingSessionService } from '../services/trackingSession.srvc';
import { User } from '../../user/models/user';
import { TrackingSession } from '../models/trackingSession';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class TrackingSessionController {
    async getAll(req: Request, resp: Response) {
        try {
            const trackingSessions = await TrackingSessionService.findAll();
            resp.status(200).send(trackingSessions);
        } catch (error) {
            console.log(error);
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 500, error, '', 50009088830965);
            errorResp.sendResponse(resp);
        }
    }

    async getAllTrackingBySessionTrackingId(req: Request, resp: Response) {
        try {
            const trackingList = await TrackingSessionService.findTrackingListByTrackingSessionId(req.params.id, req );
            resp.status(200).send(trackingList);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 500, error, '', 500023210965);
            errorResp.sendResponse(resp);
        }
    }

    async findOneById(req: Request, resp: Response) {
        try {
            const trackingSession = await TrackingSessionService.findOneById(req.params.id);
            resp.status(200).send(trackingSession);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, error, '', 404090333330965);
            errorResp.sendResponse(resp);
        }
    }

    async saveTrackingSession(req: Request, res: Response, next: NextFunction) {
        try {
            const trackingSession: TrackingSession = req.body;
            trackingSession.idUser = req.user._id;
            const trackingSessions = await TrackingSessionService.save(trackingSession);
            res.send({
                msg: 'save trackingSession',
                data: trackingSessions,
                status: 201
            });
        } catch (error) {
            console.log(error);
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 50090333330965);
            errorResp.sendResponse(res);
        }
    }
}

export default new TrackingSessionController();
