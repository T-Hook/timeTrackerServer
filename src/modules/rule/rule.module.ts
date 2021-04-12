import { Router } from 'express';

import RuleController from './controllers/rule.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const RuleRouter = Router();
RuleRouter.get('/', AuthController.verifyUser, RuleController.getAll);
RuleRouter.post('/', AuthController.verifyUser, RuleController.saveRule);
RuleRouter.get('/:id', AuthController.verifyUser, RuleController.findOneByIdAndOwnerId);
RuleRouter.put('/:id', AuthController.verifyUser, RuleController.updateRule);
RuleRouter.delete('/:id', AuthController.verifyUser, RuleController.deleteRule);
export { RuleRouter };
