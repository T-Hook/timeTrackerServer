import { Router } from 'express';
import NotificationController from './controllers/notification.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const NotificationRouter = Router();
NotificationRouter.get('/', AuthController.verifyUser, NotificationController.getAll);
NotificationRouter.post('/', AuthController.verifyUser, NotificationController.save);
NotificationRouter.get('/:id', AuthController.verifyUser, NotificationController.findOneByIdAndOwnerId);
NotificationRouter.put('/:id', AuthController.verifyUser,  NotificationController.update);
NotificationRouter.delete('/:id', AuthController.verifyUser,  NotificationController.delete);

export { NotificationRouter };
