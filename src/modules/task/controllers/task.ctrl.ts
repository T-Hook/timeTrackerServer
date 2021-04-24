import { NextFunction, Request, Response } from 'express';
import { default as TaskService } from '../services/task.srvc';
import { User } from '../../user/models/user';
import { Task } from '../models/task';
import { default as UserService } from '../../user/services/user.srvc';
import * as _ from 'lodash';
import { ErrorResponse } from '../../../components/errorResponse';

class TaskController {
    async getAll(req: Request, resp: Response) {
        try {
            const tasks = await TaskService.findAll();
            resp.status(200).send(tasks);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async getAllinproject(req: Request, resp: Response) {
        try {
            const ProjectId = req.params.id;
            const tasks = await TaskService.findAllInproject(ProjectId);
            resp.status(200).send(tasks);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async update(req: Request, resp: Response) {
        const task: Task = req.body;
        // @ts-ignore
        task._id = req.params.id;
        task.idUser = req.user._id;
        try {
            const __task = await TaskService.findOneById(req.params.id);
            // @ts-ignore
            if (!__task._id) {
                resp.send({
                    msg: 'task not found ',
                    data: {},
                    status: 500
                });
            } else {
                const _task = await TaskService.update(req.params.id, task);
                resp.send({
                    msg: 'task updated',
                    data: _task,
                    status: 201
                });
            }
        } catch (e) {
            resp.send({
                msg: 'error',
                data: e,
                status: 500
            });
        }
    }
    async delete(req: Request, resp: Response) {
        const task: Task = req.body;
        // @ts-ignore
        task._id = req.params.id;
        task.idUser = req.user._id;
        try {
            const _task = await TaskService.deleteOneById(req.params.id);
            resp.send({
                msg: ' deleted',
                data: _task,
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
            const task = await TaskService.findOneByIdAndOwnerId(req.user);
            resp.status(200).send(task);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async findOneById(req: Request, resp: Response) {
        try {
            const task = await TaskService.findOneById( req.params.id);
            resp.status(200).send(task);
        } catch (error) {
            resp.send({
                msg: 'Not found',
                status: 404
            });
        }
    }
    async saveTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task: Task = req.body;
            const tasks = await TaskService.save(task);
            res.send({
                msg: 'save task',
                data: tasks,
                status: 201
            });
        } catch (error) {
            const errorResp: ErrorResponse = new ErrorResponse(req, res, 500, error, '', 5009095920965);
            errorResp.sendResponse(res);
        }
    }
}

export default new TaskController();
