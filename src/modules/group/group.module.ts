import { Router } from 'express';

import GroupController from './controllers/group.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const GroupRouter = Router();
GroupRouter.get('/', AuthController.verifyUser, GroupController.getAll);
GroupRouter.get('/user', AuthController.verifyUser, GroupController.getAllGroupInUser);
GroupRouter.get('/:id/user/role', AuthController.verifyUser, GroupController.getAllUserRoleInGroup);
GroupRouter.get('/:id/project/role', AuthController.verifyUser, GroupController.getAllProjectInGroup);
GroupRouter.post('/', AuthController.verifyUser, GroupController.saveGroup);
GroupRouter.get('/:id', AuthController.verifyUser, GroupController.findOneByIdAndOwnerId);
GroupRouter.put('/:id/user/role', AuthController.verifyUser, GroupController.saveGroupUser);
GroupRouter.delete('/:id/user/role', AuthController.verifyUser, GroupController.deleteGroupUser);
GroupRouter.put('/:id/project/role', AuthController.verifyUser, GroupController.saveGroupProject);
GroupRouter.delete('/:id/project/role', AuthController.verifyUser, GroupController.deleteGroupProject);
GroupRouter.delete('/:id', AuthController.verifyUser, GroupController.getAll);
// TODO remove those Apis from project module because they are moved to the company module
// GroupRouter.put('/:id/plan', AuthController.verifyUser, GroupController.saveGroupPlan);
// GroupRouter.delete('/:id/plan', AuthController.verifyUser, GroupController.deleteGroupPlan);
// GroupRouter.get('/:id/plan', AuthController.verifyUser, GroupController.getAllPlanInGroup);
export { GroupRouter };
