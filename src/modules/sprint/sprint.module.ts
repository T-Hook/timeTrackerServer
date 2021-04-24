import { Router } from 'express';

import SprintController from './controllers/sprint.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const SprintRouter = Router();
SprintRouter.get('/', AuthController.verifyUser, SprintController.getAll);
SprintRouter.get('/:id', AuthController.verifyUser, SprintController.getAllInproject);
SprintRouter.post('/', AuthController.verifyUser, SprintController.saveSprint);
SprintRouter.get('/sprint', AuthController.verifyUser, SprintController.findOneByIdAndOwnerId);
SprintRouter.put('/:id', AuthController.verifyUser,  SprintController.update);
SprintRouter.delete('/:id', AuthController.verifyUser,  SprintController.delete);

export { SprintRouter };
