import { NextFunction, Request, Response } from 'express';
import { default as GroupService } from '../services/group.srvc';
import { default as GroupPlanService } from '../services/groupPlan.srvc';
import { User } from '../../user/models/user';
import { Group } from '../models/group';
import { GroupPlan } from '../models/groupPlan';
import { default as UserService } from '../../user/services/user.srvc';
import { default as ProjectService } from '../../project/services/project.srvc';
import { default as PlanService } from '../../plan/services/plan.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';
import { GroupUser } from '../models/groupUser';
import { default as GroupUserService } from '../services/groupUser.srvc';
import { default as GroupProjectService } from '../services/groupProject.srvc';
import { GroupProject } from '../models/groupProject';

class GroupController {
    async getAll(req: Request, resp: Response) {
        try {
            const groups = await GroupService.findAll();
            resp.status(200).send(groups);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllUserRoleInGroup(req: Request, resp: Response) {
        try {
            const usersRoles = await GroupService.findUserRoleInGroup(req.params.id);
            resp.status(200).send(usersRoles);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllGroupInUser(req: Request, resp: Response) {
        try {
            const groups = await GroupService.findAllInUser(req.user);
            resp.status(200).send(groups);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllProjectInGroup(req: Request, resp: Response) {
        try {
            const groups = await GroupProjectService.getAllProjectInGroup(req.params.id);
            resp.status(200).send(groups);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllPlanInGroup(req: Request, resp: Response) {
        try {
            const groups = await GroupPlanService.getAllPlanInGroup(req.params.id);
            resp.status(200).send(groups);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                error: error,
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const group = await GroupService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(group);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async saveGroup(req: Request, res: Response, next: NextFunction) {
        if (req.user.companyId) {
            try {
                const group: Group = req.body;
                group.idUser = req.user._id;
                group.companyId = req.user.companyId._id;
                const groups = await GroupService.save(group);
                res.send({
                    msg: 'save group',
                    data: groups,
                    status: 201
                });
            } catch (error) {
                const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
                errorResp.sendResponse(res);
            }
        } else {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 450, [], '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }

    async deleteGroupUser(req: Request, res: Response, next: NextFunction) {

        // TODO check role in this group
        await GroupUserService.delete(req.params.id);
        res.send({
            msg: 'delete',
            status: 203
        });
    }

    async deleteGroupProject(req: Request, res: Response, next: NextFunction) {

        // TODO check role in this group
        await GroupProjectService.delete(req.params.id);
        res.send({
            msg: 'delete',
            status: 203
        });
    }

    async deleteGroupPlan(req: Request, res: Response, next: NextFunction) {

        // TODO check role in this group
        await GroupPlanService.delete(req.params.id);
        res.send({
            msg: 'delete',
            status: 203
        });
    }

    async saveGroupUser(req: Request, res: Response, next: NextFunction) {
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
            const groupUser: GroupUser = req.body;
            const _groupUser = await GroupUserService.findAndUpdate(groupUser);

            const verifyExistingObject = await GroupUserService.findByUserAndGroup(groupUser.idUser, groupUser.idGroup);
            const group = await GroupService.find(req.user, groupUser.idGroup);
            const user = await UserService.findById(groupUser.idUser);
            if (group && user) {
                groupUser.idOwner = req.user._id;
                groupUser.companyId = req.user.companyId._id;
                if (verifyExistingObject) {
                    const _groupUser = await GroupUserService.findAndUpdate(groupUser);
                    res.send({
                        msg: 'save group',
                        data: _groupUser,
                        status: 201
                    });
                } else {
                    const _groupUser = await GroupUserService.save(groupUser);
                    res.send({
                        msg: 'save group',
                        data: _groupUser,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'group or user not found',
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


    async saveGroupProject(req: Request, res: Response, next: NextFunction) {
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
            const groupProject: GroupProject = req.body;
            const _groupProject = await GroupProjectService.findAndUpdate(groupProject);

            const verifyExistingObject = await GroupProjectService.findByProjectAndGroup(groupProject.idProject,
                groupProject.idGroup);
            const group = await GroupService.find(req.user, groupProject.idGroup);
            const user = await ProjectService.findById(groupProject.idProject);
            if (group && user) {
                groupProject.idOwner = req.user._id;
                groupProject.companyId = req.user.companyId._id;
                if (verifyExistingObject) {
                    const _groupProject = await GroupProjectService.findAndUpdate(groupProject);
                    res.send({
                        msg: 'save group',
                        data: _groupProject,
                        status: 201
                    });
                } else {
                    const _groupProject = await GroupProjectService.save(groupProject);
                    res.send({
                        msg: 'save group',
                        data: _groupProject,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'group or project not found',
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

    async saveGroupPlan(req: Request, res: Response, next: NextFunction) {
        try {
            const groupPlan: GroupPlan = req.body;
            const _groupPlan = await GroupPlanService.findAndUpdate(groupPlan);

            const verifyExistingObject = await GroupPlanService.findByPlanAndGroup(groupPlan.idPlan,
                groupPlan.idGroup);
            const group = await GroupService.find(req.user, groupPlan.idGroup);
            const user = await PlanService.findById(groupPlan.idPlan);
            if (group && user) {
                groupPlan.idOwner = req.user._id;
                groupPlan.companyId = req.user.companyId._id;
                if (verifyExistingObject) {
                    const _groupPlan = await GroupPlanService.findAndUpdate(groupPlan);
                    res.send({
                        msg: 'save group',
                        data: _groupPlan,
                        status: 201
                    });
                } else {
                    const _groupPlan = await GroupPlanService.save(groupPlan);
                    res.send({
                        msg: 'save group',
                        data: _groupPlan,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'group or plan not found',
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
}

export default new GroupController();
