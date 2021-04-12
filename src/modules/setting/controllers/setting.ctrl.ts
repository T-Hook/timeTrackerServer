import { NextFunction, Request, Response } from 'express';
import { default as SettingService } from '../services/setting.srvc';
import { User } from '../../user/models/user';
import { Setting } from '../models/setting';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class SettingController {
    async getAll(req: Request, resp: Response) {
        try {
            const settings = await SettingService.findAll();
            resp.status(200).send(settings);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }

    async findOneByIdAndOwnerId(req: Request, resp: Response) {
        try {
            const setting = await SettingService.findOneByIdAndOwnerId(req.user, req.params.id);
            resp.status(200).send(setting);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const setting = await SettingService.findOneById( req.params.id);
            resp.status(200).send(setting);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async saveSetting(req: Request, res: Response, next: NextFunction) {
        try {
            const setting: Setting = req.body;
            setting.idUser = req.user._id;
            const settings = await SettingService.save(setting);
            res.send({
                msg: 'save setting',
                data: settings,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }
}

export default new SettingController();
