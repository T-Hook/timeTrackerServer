import { Router } from 'express';

import SettingController from './controllers/setting.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const SettingRouter = Router();
SettingRouter.get('/', AuthController.verifyUser, SettingController.getAll);
SettingRouter.post('/', AuthController.verifyUser, SettingController.saveSetting);
SettingRouter.get('/:id', AuthController.verifyUser, SettingController.findOneByIdAndOwnerId);

export { SettingRouter };
