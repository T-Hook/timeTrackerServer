import { Router } from 'express';

import ProjectController from './controllers/project.ctrl';
import ProjectCompanyController from './controllers/projectCompany.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';
import { default as CompanyAclController } from '../company/controllers/companyAcl.ctrl';

const ProjectRouter = Router();
ProjectRouter.get('/', AuthController.verifyUser, ProjectController.getAll);
ProjectRouter.post('/', AuthController.verifyUser, ProjectController.saveProject);
ProjectRouter.get('/:id', AuthController.verifyUser, ProjectController.findOneByIdAndOwnerId);
ProjectRouter.put('/:id', AuthController.verifyUser, ProjectController.update);
ProjectRouter.delete('/:id', AuthController.verifyUser, ProjectController.deleteProject);
ProjectRouter.get('/company/:id', AuthController.verifyUser, CompanyAclController.verifyUserReadAccessInCompany, ProjectController.getAllProjectInCompany);
ProjectRouter.get('/shared', AuthController.verifyUser, ProjectController.getAllSharedProjects);
ProjectRouter.get('/shared/users/:id', AuthController.verifyUser, ProjectController.getUserInProject);
ProjectRouter.post('/shared', AuthController.verifyUser, ProjectController.saveProjectUser);
ProjectRouter.get('/company', AuthController.verifyUser, ProjectCompanyController.getCompanyInProject);
ProjectRouter.get('/:id/project/role', AuthController.verifyUser, ProjectController.getAllUserRoleInProject);
// ProjectRouter.get('/shared/users/:id', AuthController.verifyUser, ProjectController.getUserInProject);
// ProjectRouter.post('/shared', AuthController.verifyUser, ProjectController.saveProjectUser);
export { ProjectRouter };
