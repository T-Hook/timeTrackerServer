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
import { default as GroupUserService } from '../../group/services/groupUser.srvc';
import { default as GroupService } from '../../group/services/group.srvc';

class CompanyController {
    async getAll(req: Request, resp: Response) {
        try {
            const companies = await CompanyService.findAll();
            resp.status(200).send(companies);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async updatec(req: Request, resp: Response) {
        const company: Company = req.body;
        // @ts-ignore
        company._id = req.params.id;
        company.idUser = req.user._id;
        try {
            const __company = await CompanyService.findOneById(req.params.id);
            // @ts-ignore
            if (!__company._id) {
                resp.send({
                    msg: 'not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _c = await CompanyService.updatec(req.params.id, company);
                resp.send({
                    msg: 'updated',
                    data: _c,
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
    async getAllCompanyForUserWithShowAccess(req: Request, resp: Response) {
        try {
            const companies = await CompanyUserService.findBySpecificAccessAndUserId(req.user._id, ['get']);
            resp.status(200).send(companies);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getSpecificCompanyForUserWithShowAccess(req: Request, resp: Response) {
        try {
            const companies = await CompanyUserService.findBySpecificAccessUserIdAndCompanyId(
                req.user._id,
                ['get'],
                req.params.id
            );
            resp.status(200).send(companies);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getSpecificCompanyByNameForUserWithShowAccess(req: Request, resp: Response) {
        try {
            const companies = await CompanyUserService.findBySpecificAccessUserIdAndCompanyName(
                req.user._id,
                ['get'],
                req.params.name
            );
            const found = companies.filter(function(item) { return !!item.idCompany;  });
            resp.status(200).send(found[0]);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const company = await CompanyService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(company);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneById(req: Request, resp: Response) {
        try {
            const company = await CompanyService.findOneById(req.params.id);
            resp.status(200).send(company);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async deleteCompany(req: Request, resp: Response) {
        const company: Company = req.body;
        // @ts-ignore
        company._id = req.params.id;
        try {
            const _company = await CompanyService.deleteOneById(req.params.id);
            resp.send({
                msg: 'company deleted',
                data: _company,
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

    async saveCompany(req: Request, res: Response, next: NextFunction) {
        try {
            const company: Company = req.body;
            company.idUser = req.user._id;
            const companies = await CompanyService.save(company);
            const listAcls = ['get', 'put', 'post', 'delete', 'share'];
            // @ts-ignore
            const companyUser: CompanyUser = {
                // @ts-ignore
                idCompany: companies._id,
                idUser: req.user._id,
                acl: listAcls
            };
            const _companyUser = await CompanyUserService.save(companyUser);
            res.send({
                msg: 'save company',
                data: _companyUser,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095998555);
            errorResp.sendResponse(res);
        }
    }

    // plan in company
    async saveCompanyPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const companyPlan: CompanyPlan = req.body;
            const _companyPlan = await CompanyPlanService.findAndUpdate(companyPlan);
            const verifyExistingObject = await CompanyPlanService.findByPlanAndCompany(companyPlan.idPlan,
                companyPlan.idCompany);
            const company = await CompanyService.find(req.user, companyPlan.idCompany);
            const user = await PlanService.findById(companyPlan.idPlan);
            if (company && user) {
                companyPlan.idOwner = req.user._id;
                if (verifyExistingObject) {
                    const _companyPlan = await CompanyPlanService.findAndUpdate(companyPlan);
                    res.send({
                        msg: 'save company',
                        data: _companyPlan,
                        status: 201
                    });
                } else {
                    const _companyPlan = await CompanyPlanService.save(companyPlan);
                    res.send({
                        msg: 'save company',
                        data: _companyPlan,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'company or plan not found',
                    status: 456
                });
            }
        } catch (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                status: 404
            });
        }
    }

    async deleteCompanyPlan(req: Request, res: Response, next: NextFunction) {

        // TODO check role in this company
        await CompanyPlanService.delete(req.params.id);
        res.send({
            msg: 'delete',
            status: 203
        });
    }

    async getAllPlanInCompany(req: Request, resp: Response) {
        try {
            const companies = await CompanyPlanService.getAllPlanInCompany(req.params.id);
            resp.status(200).send(companies);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                error: error,
                status: 404
            });
        }
    }


    async saveCompanyUser(req: Request, res: Response, next: NextFunction) {
        const groupped = _.groupBy(req.body.acl, function (n) {
            return n;
        });
        const result = _.uniq(_.flatten(_.filter(groupped, function (n) {
            const findRole = _.findIndex(['get', 'put', 'post', 'delete', 'share'], function (o) {
                return o == n[0];
            });
            return (n.length >= 1 && (findRole >= 0));
        })));
        req.body.acl = result;
        try {
            const companyUser: CompanyUser = req.body;
            const _companyUser = await CompanyUserService.findAndUpdate(companyUser);

            const verifyExistingObject = await CompanyUserService.findByUserAndCompany(companyUser.idUser, companyUser.idCompany);
            const company = await CompanyService.find(req.user, companyUser.idCompany);
            const user = await UserService.findById(companyUser.idUser);
            if (company && user) {
                companyUser.idOwner = req.user._id;
                if (verifyExistingObject) {
                    const _companyUser = await CompanyUserService.findAndUpdate(companyUser);
                    res.send({
                        msg: 'save company',
                        data: _companyUser,
                        status: 201
                    });
                } else {
                    const _companyUser = await CompanyUserService.save(companyUser);
                    res.send({
                        msg: 'save company',
                        data: _companyUser,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'company or user not found',
                    status: 456
                });
            }
        } catch (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                status: 404
            });
        }
    }

    async deleteCompanyUser(req: Request, res: Response, next: NextFunction) {

        // TODO check role in this company
        await CompanyUserService.delete(req.params.id);
        res.send({
            msg: 'delete',
            status: 203
        });
    }


    async getAllUserRoleInCompany(req: Request, resp: Response) {
        try {
            const usersRoles = await CompanyService.findUserRoleInCompany(req.params.id);
            resp.status(200).send(usersRoles);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllSharedProjectInCompany(req: Request, resp: Response) {
        if (req.user.companyId) {
            try {
                const usersRoles = await CompanyService
                    .findSharedProjectWithUserInCompany(req.user.companyId._id, req.user._id);
                resp.status(200).send(usersRoles);
            } catch (error) {
                resp.send({
                    msg: 'Not found',
                    status: 404
                });
            }
        } else {
            resp.status(200).send([]);
        }

    }

}

export default new CompanyController();
