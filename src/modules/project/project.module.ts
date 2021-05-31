import { Router } from 'express';

import ProjectController from './controllers/project.ctrl';
import ProjectCompanyController from './controllers/projectCompany.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';
import { default as CompanyAclController } from '../company/controllers/companyAcl.ctrl';

const ProjectRouter = Router();
ProjectRouter.get('/', AuthController.verifyUser, ProjectController.getAll);
ProjectRouter.get('/get', AuthController.verifyUser, ProjectController.get);
ProjectRouter.get('/u', AuthController.verifyUser, ProjectController.getone);
ProjectRouter.post('/', AuthController.verifyUser, ProjectController.saveProject);
ProjectRouter.get('/:id', AuthController.verifyUser, ProjectController.findOneById);
ProjectRouter.put('/:id', AuthController.verifyUser, ProjectController.update);
ProjectRouter.delete('/:id', AuthController.verifyUser, ProjectController.deleteProject);
ProjectRouter.get('/company/:id', AuthController.verifyUser, CompanyAclController.verifyUserReadAccessInCompany, ProjectController.getAllProjectInCompany);
ProjectRouter.get('/project/shared/:id', AuthController.verifyUser, ProjectController.getAllSharedProjects);
ProjectRouter.get('/project/shared', AuthController.verifyUser, ProjectController.getSharedProjects);
ProjectRouter.get('/shared/users/:id', AuthController.verifyUser, ProjectController.getUserInProject);
ProjectRouter.post('/shared', AuthController.verifyUser, ProjectController.saveProjectUser);
ProjectRouter.get('/company', AuthController.verifyUser, ProjectCompanyController.getCompanyInProject);
ProjectRouter.get('/:id/project/role', AuthController.verifyUser, ProjectController.getAllUserRoleInProject);
// ProjectRouter.get('/shared/users/:id', AuthController.verifyUser, ProjectController.getUserInProject);
// ProjectRouter.post('/shared', AuthController.verifyUser, ProjectController.saveProjectUser);
export { ProjectRouter };
