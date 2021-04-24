import { Router } from 'express';

import PlanController from './controllers/plan.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const PlanRouter = Router();
PlanRouter.get('/',  PlanController.getAll);
PlanRouter.post('/', AuthController.verifyUser, PlanController.savePlan);
PlanRouter.post('/plan/rule/:idplan/:idrule', AuthController.verifyUser, PlanController.addRuletoPlan);
// PlanRouter.get('/:id', AuthController.verifyUser, PlanController.findOneByIdAndOwnerId);
PlanRouter.get('/:id', PlanController.findOneById);
PlanRouter.put('/:id', AuthController.verifyUser, PlanController.updatePlan);
PlanRouter.delete('/:id', AuthController.verifyUser, PlanController.deletePlan);
export { PlanRouter };
