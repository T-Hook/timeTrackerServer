import { Router } from 'express';

import TaskController from './controllers/task.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const TaskRouter = Router();
TaskRouter.get('/', AuthController.verifyUser, TaskController.getAll);
TaskRouter.get('/task', AuthController.verifyUser, TaskController.getone);
TaskRouter.get('/:id', AuthController.verifyUser, TaskController.getAllinproject);
TaskRouter.post('/', AuthController.verifyUser, TaskController.saveTask);
TaskRouter.put('/:id', AuthController.verifyUser,  TaskController.update);
TaskRouter.delete('/:id', AuthController.verifyUser,  TaskController.delete);

export { TaskRouter };
