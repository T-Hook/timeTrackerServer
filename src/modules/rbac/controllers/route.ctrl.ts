import { NextFunction, Request, Response } from 'express';
import { default as RouteService } from '../services/route.srvc';
import { Route } from '../models/route';
import { cat } from 'shelljs';


class RouteController {
    async saveRoutesFromExpress(route) {
        const routeModel: Route = route;
        return await RouteService.save(routeModel);
    }

    async getAll(req: Request, resp: Response) {
        try {
            const routes = await RouteService.findAll(req.user);
            resp.status(200).send(routes);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async saveRoute(req: Request, res: Response, next: NextFunction) {
        try {
            const route: Route = req.body;
            const routes = await RouteService.save(route);
            res.send({
                msg: 'save route',
                data: route,
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
            const countRoute = await RouteService.count(name);
            return !!countRoute;
        } catch (e) {
            return false;
        }
    }
    async delete(req: Request, resp: Response) {
        const route: Route = req.body;
        // @ts-ignore
        route._id = req.params.id;
        try {
            const _route = await RouteService.deleteOneById(req.params.id);
            resp.send({
                msg: ' deleted',
                data: _route,
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


}

export default new RouteController();
