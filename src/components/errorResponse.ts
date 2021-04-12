import { Request, Response } from 'express';
import DefaultResponse from './defaultResponse';

export class ErrorResponse extends DefaultResponse {

    errors: object = {};
    message: string = '';
    code: number = 1;

    getMessage(status) {
        switch (status) {
            case 400: {
                return 'Invalid request';
            }
            case 401: {
                return 'Invalid or no token supplied';
            }
            case 404: {
                return ' not Found  ';
            }
            case 440: {
                return 'session expired.  ';
            }
            case 450: {
                return 'no company assigned .  ';
            }
            case 408: {
                return 'Request Timeout';
            }
            case 508: {
                return 'Request Timeout';
            }
            default: {
                return 'internal error ';
            }
        }
    }

    messageResponse(message): string {
        return !message ? this.getMessage(this.status) : message;
    }

    constructor(req: Request, res: Response, status: number, errors: any, message: string = '', code: number = 1) {
        super(req, res, status, message);
        this.code = code;
        let errs = [];
        let mess;
        if (errors) {
            if (errors.code && errors.code == 11000) {
                this.status = 409;
                errs[0] = errors.errmsg;
            } else {
                errs = errors.errors || errors.ValidationError || errors;
            }
            mess = errors.message || errors.errmsg;
        }
        this.message = this.messageResponse(message);
        if (errs) {
            this.errors = errs;
        }
        if (mess) {
            this.message = mess;
        }
    }
}
