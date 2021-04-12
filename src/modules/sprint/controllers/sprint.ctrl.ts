import { NextFunction, Request, Response } from 'express';
import { default as SprintService } from '../services/sprint.srvc';
import { User } from '../../user/models/user';
import { Sprint } from '../models/sprint';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class SprintController {
    async getAll(req: Request, resp: Response) {
        try {
            const sprints = await SprintService.findAll();
            resp.status(200).send(sprints);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async update(req: Request, resp: Response) {
        const sprint: Sprint = req.body;
        // @ts-ignore
        sprint._id = req.params.id;
        sprint.idUser = req.user._id;
        try {
            const __sprint = await SprintService.findOneById(req.params.id);
            // @ts-ignore
            if (!__sprint._id) {
                resp.send({
                    msg: 'sprint not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _rule = await SprintService.update(req.params.id, sprint);
                resp.send({
                    msg: 'sprint updated',
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
        const sprint: Sprint = req.body;
        // @ts-ignore
        sprint._id = req.params.id;
        sprint.idUser = req.user._id;
        try {
            const _sprint = await SprintService.deleteOneById(req.params.id);
            resp.send({
                msg: 'sprint deleted',
                data: _sprint,
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
            const sprint = await SprintService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(sprint);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const sprint = await SprintService.findOneById( req.params.id);
            resp.status(200).send(sprint);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async saveSprint(req: Request, res: Response, next: NextFunction) {
        try {
            const sprint: Sprint = req.body;
            sprint.idUser = req.user._id;
            const sprints = await SprintService.save(sprint);
            res.send({
                msg: 'save sprint',
                data: sprints,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }
}

export default new SprintController();
