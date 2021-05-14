import { NextFunction, Request, Response } from 'express';
import { default as MailService } from '../services/mail.srvc';
import { User } from '../../user/models/user';
import { Mail } from '../models/mail';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class MailController {
    async getAll(req: Request, resp: Response) {
        try {
            const mails = await MailService.findAll();
            resp.status(200).send(mails);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getone(req: Request, resp: Response) {
        try {
            const mails = await MailService.findone(req.user);
            resp.status(200).send(mails);
        } catch (error) {
            resp.send({
                msg: 'Not found mail !',
                status: 404
            });
        }
    }
    async getonewithsender(req: Request, resp: Response) {
        try {
            const sender: Mail = req.body;
            sender.idS = req.params.id;
            const mails = await MailService.find1withsenderandreceiver( req.user , req.params.id);
            const mail = await MailService.find2withsenderandreceiver(  req.user , req.params.id );
            const finalresult = mails.concat(mail);
            resp.status(200).send(finalresult);
        } catch (error) {
            resp.send({
                msg: 'Not found mail !',
                status: 404
            });
        }
    }
    async delete(req: Request, resp: Response) {
        const mail: Mail = req.body;
        // @ts-ignore
        mail._id = req.params.id;
        try {
            const _mail = await MailService.deleteOneById(req.params.id);
            resp.send({
                msg: 'mail deleted',
                data: _mail,
                status: 201
            });
        } catch (e) {
            resp.send({
                msg: 'error',
                data: e,
                status: 500
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const mail = await MailService.findOneByIdAndOwnerId(req.user);
            resp.status(200).send(mail);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const mail = await MailService.findOneById(req.params.id);
            resp.status(200).send(mail);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const mail: Mail = req.body;
            const mails = await MailService.save(mail);
            res.send({
                msg: 'save mail',
                data: mails,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }
}

export default new MailController();
