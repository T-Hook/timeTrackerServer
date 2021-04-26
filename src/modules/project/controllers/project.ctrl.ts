import { NextFunction, Request, Response } from 'express';
import { default as ProjectService } from '../services/project.srvc';
import { default as ProjectUserService } from '../services/projectUser.srvc';
import { User } from '../../user/models/user';
import { Project } from '../models/project';
import { ProjectUser } from '../models/projectUser';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';
import { default as CompanyAclController } from '../../company/controllers/companyAcl.ctrl';
class ProjectController {
    async getAll(req: Request, resp: Response) {
        try {
            const projects = await ProjectService.findAll(req.user);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async getAllProjectInCompany(req: Request, resp: Response) {
        try {
            const projects = await ProjectService.findAllInCompany(req.params.id);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const project = await ProjectService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(project);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async saveProject(req: Request, res: Response, next: NextFunction) {
        const project: Project = req.body;
        project.idUser = req.user._id;
        try {
            const projects = await ProjectService.save(project);
            res.send({
                msg: 'save project',
                data: projects,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 50023309523998555);
            errorResp.sendResponse(res);
        }
    }

    async getAllSharedProjects(req: Request, resp: Response) {
        try {
            const ProjectId = req.params.id;
            const projects = await ProjectUserService.findAllShared(ProjectId);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getSharedProjects(req: Request, resp: Response) {
        try {
            const projects = await ProjectUserService.findAShared();
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getone(req: Request, resp: Response) {
        try {
            const projects = await ProjectUserService.find(req.user);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found !!!!!',
                status: 404
            });
        }
    }
    async getUserInProject(req: Request, resp: Response) {
        const ProjectId = req.params.id;
        try {
            const projects = await ProjectUserService.findAllUserInSharedProject(req.user._id, ProjectId);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: error.errors ? error.errors : error,
                status: 404
            });
        }
    }
    async update(req: Request, resp: Response) {
        const project: Project = req.body;
        // @ts-ignore
        project._id = req.params.id;
        project.idUser = req.user._id;
        try {
            const __project = await ProjectService.findOneById(req.params.id);
            // @ts-ignore
            if (!__project._id) {
                resp.send({
                    msg: 'not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _p = await ProjectService.update(req.params.id, project);
                resp.send({
                    msg: 'updated',
                    data: _p,
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
    async deleteProject(req: Request, resp: Response) {
        const project: Project = req.body;
        // @ts-ignore
        project._id = req.params.id;
        try {
            const _project = await ProjectService.deleteOneById(req.params.id);
            resp.send({
                msg: 'project deleted',
                data: _project,
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
    async saveProjectUser(req: Request, res: Response, next: NextFunction) {
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
            const projectUser: ProjectUser = req.body;
            const _projectUser = await ProjectUserService.findAndUpdate(projectUser);
            const verifyExistingObject = await ProjectUserService.findByUserAndProject(projectUser.idUser, projectUser.idProject);
            const project = await ProjectService.find(req.user, projectUser.idProject);
            const user = await UserService.findById(projectUser.idUser);
            if (project && user) {
                projectUser.idOwner = req.user._id;
                if (verifyExistingObject) {
                    const _projectUser = await ProjectUserService.findAndUpdate(projectUser);
                    res.send({
                        msg: 'save project',
                        data: req.body,
                        status: 201
                    });
                } else {
                    const _projectUser = await ProjectUserService.save(projectUser);
                    res.send({
                        msg: 'save project',
                        data: req.body,
                        status: 201
                    });
                }
            } else {
                res.send({
                    msg: 'project or user not found',
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
    async getAllUserRoleInProject(req: Request, resp: Response) {
        try {
            const usersRoles = await ProjectService.findUserRoleInProject(req.params.id);
            resp.status(200).send(usersRoles);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

}

export default new ProjectController();
