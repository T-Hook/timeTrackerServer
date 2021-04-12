import { Request, Response } from 'express';
import DefaultResponse from './defaultResponse';

export class SuccessResponse extends DefaultResponse {

    public data: object = {};
    message: string = '';
    code: number = 1;

    getMessage(status) {
        switch (status) {
            case 201: {
                return 'object created ';
            }
            case 200: {
                return ' object updated ';
            }
            default: {
                return 'success ';
            }
        }
    }

    messageResponse(message): string {
        return !message ? this.getMessage(this.status) : message;
    }

    constructor(req: Request, res: Response, status: number, data: object, message: string = '', code: number = 1) {
        super(req, res, status, message);
        this.message = this.messageResponse(message);
        this.data = data;
        this.code = code;
    }

    sendStatus(res: Response) {
        res.status(this.status).send(this);
    }
}