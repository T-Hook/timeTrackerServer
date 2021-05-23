import { NextFunction, Request, Response } from 'express';
import { default as UpdatesService } from '../services/updates.srvc';
import { Updates } from '../models/updates';
import { cat } from 'shelljs';


class UpdatesController {
    async saveUpdatesFromExpress(updates) {
        const updatesModel: Updates = updates;
        return await UpdatesService.save(updatesModel);
    }

    async getAll(req: Request, resp: Response) {
        try {
            const routes = await UpdatesService.findAll(req.user);
            resp.status(200).send(routes);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const updates: Updates = req.body;
            const updatess = await UpdatesService.save(updates);
            res.send({
                msg: 'save!!!!',
                data: updates,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 201
            });
        } catch (error) {
            res.send({
                msg: error.errors ? error.errors : error,
                url: req.protocol + '://' + req.get('host') + req.originalUrl,
                status: 401
            });
        }
    }

    async checkIfRouteExist(name) {
        try {
            const countRoute = await UpdatesService.count(name);
            return !!countRoute;
        } catch (e) {
            return false;
        }
    }
}
export default new UpdatesController();
