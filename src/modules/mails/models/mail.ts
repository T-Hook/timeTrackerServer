import { User } from '../../user/models/user';
import * as mongoose from 'mongoose';

export interface Mail {
    mail: { type: string, empty: true, required: false };
    date: { type: string, empty: true, required: false };
    idS: User;
    idR: User
}
