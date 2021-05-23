import { Router } from 'express';

import TaskController from './controllers/task.ctrl';
import UpdatesController from './controllers/updates.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const TaskRouter = Router();
TaskRouter.get('/', AuthController.verifyUser, TaskController.getAll);
TaskRouter.get('/task/:id', AuthController.verifyUser, TaskController.findOneById);
TaskRouter.get('/task', AuthController.verifyUser, TaskController.getone);
TaskRouter.get('/:id', AuthController.verifyUser, TaskController.getAllinproject);
TaskRouter.post('/', AuthController.verifyUser, TaskController.saveTask);
TaskRouter.put('/:id', AuthController.verifyUser,  TaskController.update);
TaskRouter.delete('/:id', AuthController.verifyUser,  TaskController.delete);
TaskRouter.put('/task/updates/:idtask/:idupdates', AuthController.verifyUser, TaskController.putUpdatesToTask);
/**
 * updates end points
 */
 TaskRouter.get('/updates/', AuthController.verifyUser, UpdatesController.getAll);
 TaskRouter.post('/updates/', AuthController.verifyUser, UpdatesController.save);
export { TaskRouter };
