import { NextFunction, Request, Response } from 'express';
import { default as RuleService } from '../services/rule.srvc';
import { User } from '../../user/models/user';
import { Rule } from '../models/rule';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { SuccessResponse } from '../../../components/successResponse';
import { ErrorResponse } from '../../../components/errorResponse';

class RuleController {
    async getAll(req: Request, resp: Response) {
        try {
            const rules = await RuleService.findAll();
            resp.status(200).send(rules);
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, resp, 404, error, '', 4043232320965);
            errorResp.sendResponse(resp);
        }
    }

    async updateRule(req: Request, resp: Response) {
        const rule: Rule = req.body;
        // @ts-ignore
        rule._id = req.params.id;
        rule.idUser = req.user._id;
        try {
            const __rule = await RuleService.findOneById(req.params.id);
            // @ts-ignore
            if (!__rule._id) {
                resp.send({
                    msg: 'rule not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _rule = await RuleService.updateRule(req.params.id, rule);
                resp.send({
                    msg: 'save rule',
                    data: _rule,
                    status: 201
                });
            }
        } catch (e) {
            resp.send({
                msg: 'save rule error ',
                data: e,
                status: 500
            });
        }
    }

    async deleteRule(req: Request, resp: Response) {
        const rule: Rule = req.body;
        // @ts-ignore
        rule._id = req.params.id;
        rule.idUser = req.user._id;
        try {
            const _rule = await RuleService.deleteOneById(req.params.id);
            resp.send({
                msg: ' rule deleted',
                data: _rule,
                status: 201
            });
        } catch (e) {
            resp.send({
                msg: 'delete rule error ',
                data: e,
                status: 500
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const rule = await RuleService.findOneByIdAndOwnerId(req.user, req.params.id);
            const respM: SuccessResponse = new SuccessResponse(req, resp, 200, rule, 'rule found  ');
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

    async saveRule(req: Request, res: Response, next: NextFunction) {
        const rule: Rule = req.body;
        rule.idUser = req.user._id;
        try {
            const rules = await RuleService.save(rule);
            res.send({
                msg: 'save rule',
                data: rules,
                status: 201
            });
        } catch (e) {
            res.send({
                msg: 'save rule error ',
                data: e,
                status: 500
            });
        }
    }

}

export default new RuleController();
