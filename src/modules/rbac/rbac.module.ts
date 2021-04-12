import { Router } from 'express';

import RbacController from './controllers/rbac.ctrl';
import PermissionController from './controllers/permission.ctrl';
import RouteController from './controllers/route.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const RbacRouter = Router();
/**
 * rbacs end points
 */
RbacRouter.get('/', AuthController.verifyUser, RbacController.getAll);
RbacRouter.get('/acl', AuthController.verifyUser, RbacController.getRules);
RbacRouter.post('/', AuthController.verifyUser, RbacController.saveRbac);
/**
 * permissions end points
 */
RbacRouter.get('/permission/', AuthController.verifyUser, PermissionController.getAll);
RbacRouter.get('/permission/:id', AuthController.verifyUser, PermissionController.findOneById);
RbacRouter.delete('/permission/:id', AuthController.verifyUser, PermissionController.delete);
RbacRouter.post('/permission/', AuthController.verifyUser, PermissionController.savePermission);
RbacRouter.put('/permission/route/:idpermission/:idroute', AuthController.verifyUser, PermissionController.putRouteToPermission);
RbacRouter.delete('/permission/route/:idpermission/:idroute', AuthController.verifyUser, PermissionController.deleteRouteFromPermission);
RbacRouter.post('/rbac/permission/:idrbac/:idpermission', AuthController.verifyUser, RbacController.addPermissionToRbac);
RbacRouter.delete('/rbac/permission/:idrbac/:idpermission', AuthController.verifyUser, RbacController.deletePermissionFromRbac);

/**
 * routes end points
 */
RbacRouter.get('/route/', AuthController.verifyUser, RouteController.getAll);
RbacRouter.post('/route/', AuthController.verifyUser, RouteController.saveRoute);
RbacRouter.delete('/route/:id', AuthController.verifyUser, RouteController.delete);

export { RbacRouter };