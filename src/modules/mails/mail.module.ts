import { Router } from 'express';
import MailController from './controllers/mail.ctrl';
import AuthController from '../authentication/controllers/auth.ctrl';

const MailRouter  = Router();
MailRouter.get('/', AuthController.verifyUser, MailController.getAll);
MailRouter.get('/mail', AuthController.verifyUser, MailController.getone);
MailRouter.get('/mails/:id', AuthController.verifyUser, MailController.getonewithsender);
MailRouter.get('/mail/:id', AuthController.verifyUser, MailController.findOneById);
MailRouter.post('/', AuthController.verifyUser, MailController.save);
MailRouter.delete('/:id', AuthController.verifyUser,  MailController.delete);

export { MailRouter };
