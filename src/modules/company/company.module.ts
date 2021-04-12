import { Router } from 'express';

import CompanyController from './controllers/company.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';
import GroupController from '../group/controllers/group.ctrl';
import { GroupRouter } from '../group/group.module';
import { default as CompanyAclController } from './controllers/companyAcl.ctrl';

const CompanyRouter = Router();
// this end point should be enabled only for superusers
CompanyRouter.get('/admin', AuthController.verifyUser, CompanyController.getAll);
CompanyRouter.get('/admin/:id', AuthController.verifyUser, CompanyController.findOneById);
CompanyRouter.put('/admin/:id', AuthController.verifyUser, CompanyController.updatec);
CompanyRouter.get('/admin/:id', AuthController.verifyUser, CompanyController.findOneById);
CompanyRouter.get('/', AuthController.verifyUser, CompanyController.getAllCompanyForUserWithShowAccess);
CompanyRouter.post('/', AuthController.verifyUser, CompanyController.saveCompany);
CompanyRouter.delete('/:id', AuthController.verifyUser, CompanyController.deleteCompany);
CompanyRouter.get('/:id', AuthController.verifyUser, CompanyController.getSpecificCompanyForUserWithShowAccess);
CompanyRouter.get('/:name/name', AuthController.verifyUser, CompanyController.getSpecificCompanyByNameForUserWithShowAccess);
CompanyRouter.put('/:id/plan', AuthController.verifyUser, CompanyController.saveCompanyPlan);
CompanyRouter.delete('/:id/plan', AuthController.verifyUser, CompanyController.deleteCompanyPlan);
CompanyRouter.get('/:id/plan', AuthController.verifyUser, CompanyController.getAllPlanInCompany);
CompanyRouter.put('/:id/user/role', AuthController.verifyUser,
CompanyAclController.verifyUserPutAccessInCompany, CompanyController.saveCompanyUser);
CompanyRouter.delete('/:id/user/role', AuthController.verifyUser, CompanyController.deleteCompanyUser);
CompanyRouter.get('/:id/user/role', AuthController.verifyUser, CompanyController.getAllUserRoleInCompany);
CompanyRouter.get('/shared/projects', AuthController.verifyUser, CompanyController.getAllSharedProjectInCompany);


export { CompanyRouter };
