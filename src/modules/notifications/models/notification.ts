import { User } from '../../user/models/user';
import * as mongoose from 'mongoose';
import { Task } from '../../task/models/task';

export interface Notification {
    data: { type: object, empty: true, required: true };
    description: { type: string, empty: true, required: false };
    date: { type: string, empty: true, required: false };
    idUser: { type: User, empty: true, required: true};

}
