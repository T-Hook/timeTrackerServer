import { NextFunction, Request, Response } from 'express';
import { default as ProjectService } from '../services/project.srvc';
import { default as ProjectUserService } from '../services/projectUser.srvc';
import { User } from '../../user/models/user';
import { Project } from '../models/project';
import { ProjectUser } from '../models/projectUser';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class ProjectCompanyController {
    async getCompanyInProject(req: Request, resp: Response) {
        try {
            const projects = await ProjectService.findCompanyInProject(req.user);
            resp.status(200).send(projects);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

}

export default new ProjectCompanyController();
