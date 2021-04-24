import { NextFunction, Request, Response } from 'express';
import { default as PlanService } from '../services/plan.srvc';
import { User } from '../../user/models/user';
import { Plan } from '../models/plan';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { SuccessResponse } from '../../../components/successResponse';
import { ErrorResponse } from '../../../components/errorResponse';

class PlanController {
    async getAll(req: Request, resp: Response) {
        try {
            const plans = await PlanService.findAll();
            resp.status(200).send(plans);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, error, '', 4043232320965);
            errorResp.sendResponse(resp);
        }
    }

    async updatePlan(req: Request, resp: Response) {
        const plan: Plan = req.body;
        // @ts-ignore
        plan._id = req.params.id;
        plan.idUser = req.user._id;
        try {
            const __plan = await PlanService.findOneById(req.params.id);
            // @ts-ignore
            if (!__plan._id) {
                resp.send({
                    msg: 'plan not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _plan = await PlanService.updatePlan(req.params.id, plan);
                resp.send({
                    msg: 'save plan',
                    data: _plan,
                    status: 201
                });
            }
        } catch (e) {
            resp.send({
                msg: 'save plan error ',
                data: e,
                status: 500
            });
        }
    }

    async deletePlan(req: Request, resp: Response) {
        const plan: Plan = req.body;
        // @ts-ignore
        plan._id = req.params.id;
        plan.idUser = req.user._id;
        try {
            const _plan = await PlanService.deleteOneById(req.params.id);
            resp.send({
                msg: ' plan deleted',
                data: _plan,
                status: 201
            });
        } catch (e) {
            resp.send({
                msg: 'delete plan error ',
                data: e,
                status: 500
            });
        }
    }

    async findOneById(req: Request, resp: Response) {
        try {
            const plan = await PlanService.findOneById(req.params.id);
            const respM: SuccessResponse = new SuccessResponse(req, resp, 200, plan, 'plan found  ');
            respM.sendStatus(resp);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, error, '', 4043232320965);
            errorResp.sendResponse(resp);
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const plan = await PlanService.findOneByIdAndOwnerId(req.user, req.params.id);
            const respM: SuccessResponse = new SuccessResponse(req, resp, 200, plan, 'plan found  ');
            respM.sendStatus(resp);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, error, '', 4043232320965);
            errorResp.sendResponse(resp);
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async savePlan(req: Request, res: Response, next: NextFunction) {
        const plan: Plan = req.body;
        plan.idUser = req.user._id;
        try {
            const plans = await PlanService.save(plan);
            res.send({
                msg: 'save plan',
                data: plans,
                status: 201
            });
        } catch (e) {
            res.send({
                msg: 'save plan error ',
                data: e,
                status: 500
            });
        }
    }

    addRuletoPlan(req: Request, resp: Response) {
        try {
            const plan = req.params.idplan, rule = req.params.idrule;
            PlanService.findById(plan).then(res => {
                res.rules.push(rule);
                PlanService.updateRule(plan, res.rules).then(res => {
                    resp.send({
                        msg: 'update plan',
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

export default new PlanController();
