import { Router } from 'express';

import TaskController from './controllers/task.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const TaskRouter = Router();
TaskRouter.get('/', AuthController.verifyUser, TaskController.getAll);
TaskRouter.post('/', AuthController.verifyUser, TaskController.saveTask);
TaskRouter.get('/:id', AuthController.verifyUser, TaskController.findOneByIdAndOwnerId);
TaskRouter.put('/:id', AuthController.verifyUser,  TaskController.update);
TaskRouter.delete('/:id', AuthController.verifyUser,  TaskController.delete);

export { TaskRouter };
