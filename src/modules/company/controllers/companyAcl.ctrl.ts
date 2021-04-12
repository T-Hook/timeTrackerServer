import { NextFunction, Request, Response } from 'express';
import { default as CompanyService } from '../services/company.srvc';
import { User } from '../../user/models/user';
import { Company } from '../models/company';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';
import { CompanyPlan } from '../models/companyPlan';
import { default as PlanService } from '../../plan/services/plan.srvc';
import { default as CompanyPlanService } from '../../company/services/companyPlan.srvc';
import { CompanyUser } from '../models/companyUser';
import { default as CompanyUserService } from '../services/companyUser.srvc';


class CompanyAclController {
    async getUserAccessInCompany(req: Request, resp: Response) {
        try {
            const userInCompanies = await CompanyUserService.findByCompanyAndUserAll(req.user._id, req.params.id);
            return userInCompanies;
        } catch (error) {
            return [];
        }
    }
    /**
     * @param req
     * @param resp
     * @param next
     * @description vrify if user have access to show company details
     */
    async verifyUserPutAccessInCompany(req: Request, resp: Response, next: NextFunction) {
        const companyUser: CompanyUser = req.body;
        try {
            const userInCompanies = await CompanyUserService.findByCompanyAndUserAll(req.user._id, req.params.id);
            if (userInCompanies.acl) {
                // @ts-ignore
                const role = userInCompanies.acl.find(element => element == 'share');
                if (role) {
                    next();
                } else {
                    resp.send({
                        msg: 'you dont have access in this company ',
                        status: 404,
                        code: 909090909303030
                    });
                }

            } else {
                resp.send({
                    msg: 'you dont have access in this company ',
                    status: 404,
                    code: 33322399383993887
                });
            }
        } catch (error) {
            resp.send({
                msg: 'you dont have access in this company ',
                status: 404,
                code: 839898398938938
            });
        }
    }
    /**
     * @param req
     * @param resp
     * @param next
     * @description vrify if user have access to show company details
     */
    async verifyUserReadAccessInCompany(req: Request, resp: Response, next: NextFunction) {
        try {
            const userInCompanies = await CompanyUserService.findByCompanyAndUserAll(req.user._id, req.params.id);
            if (userInCompanies.acl) {
                // @ts-ignore
                const role = userInCompanies.acl.find(element => element == 'get');
                if (role) {
                    next();
                } else {
                    resp.send({
                        msg: 'you dont have access in this company ',
                        status: 404,
                        code: 909090909303030
                    });
                }

            } else {
                resp.send({
                    msg: 'you dont have access in this company ',
                    status: 404,
                    code: 33322399383993887
                });
            }
        } catch (error) {
            resp.send({
                msg: 'you dont have access in this company ',
                status: 404,
                code: 839898398938938
            });
        }
    }


}

export default new CompanyAclController();
