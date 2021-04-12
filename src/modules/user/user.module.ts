import { Router } from 'express';
import AuthController from './../authentication/controllers/auth.ctrl';
import UserController from './controllers/user.ctrl';


const UserRouter = Router();
UserRouter.get('/', AuthController.verifyUser, UserController.getAll);
UserRouter.get('/users', AuthController.verifyUser, UserController.getSpecificUserForUserWithShowAccess);
UserRouter.get('/profiles', AuthController.verifyUser, UserController.getAllProfile);
UserRouter.get('/me', AuthController.verifyUser, UserController.getProfile);
UserRouter.post('/', AuthController.verifyUser, UserController.saveUser);
UserRouter.get('/:id', AuthController.verifyUser, UserController.findOneByIdAndOwnerId);
UserRouter.put('/:id', AuthController.verifyUser,  UserController.update);
UserRouter.delete('/:id', AuthController.verifyUser,  UserController.delete);

export { UserRouter };
