import { Router } from 'express';

import TrackingSessionController from './controllers/trackingSession.ctrl';
import TrackingController from './controllers/tracking.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const TrackingRouter = Router();
TrackingRouter.get('/', AuthController.verifyUser, TrackingController.getAll);
TrackingRouter.get('/get', AuthController.verifyUser, TrackingController.get);
TrackingRouter.post('/', AuthController.verifyUser, TrackingController.saveTracking);
TrackingRouter.get('/:id', AuthController.verifyUser, TrackingController.findOneByIdAndOwnerId);


export { TrackingRouter };
