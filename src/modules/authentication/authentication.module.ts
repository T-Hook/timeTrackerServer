import { Router } from 'express';
import AuthController from './controllers/auth.ctrl';
import * as express from '../../app';


const AuthRouter = Router();
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/login/company', AuthController.loginWithCompany);
AuthRouter.post('/register', AuthController.register);
AuthRouter.get('/activate/:activationToken', AuthController.activate);
// /auth/updatepassword
AuthRouter.patch('/updatepassword', AuthController.updatePasswordRequest);
AuthRouter.post('/updatepassword', AuthController.updatePassword);
AuthRouter.get('/mail', AuthController.mail);
AuthRouter.get('/useragent', function(req, res) {
    // @ts-ignore
    // @ts-ignore
    res.send(req.useragent);
});
export { AuthRouter };
