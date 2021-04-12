import { Router } from 'express';

import TrackingSessionController from './controllers/trackingSession.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const TrackingSessionRouter = Router();
// tracking session routes
TrackingSessionRouter.get('/', AuthController.verifyUser, TrackingSessionController.getAll);
TrackingSessionRouter.post('/', AuthController.verifyUser, TrackingSessionController.saveTrackingSession);
TrackingSessionRouter.get('/:id', AuthController.verifyUser, TrackingSessionController.findOneById);
TrackingSessionRouter.get('/:id/tracking', AuthController.verifyUser,
    TrackingSessionController.getAllTrackingBySessionTrackingId);
export { TrackingSessionRouter };
