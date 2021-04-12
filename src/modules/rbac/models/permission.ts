import { User } from '../../user/models/user';
import { Route } from './route';
import * as mongoose from 'mongoose';
export interface Permission {

    name: { type: string, empty: false, required: true, index: { unique: true } };
    description: { type: string, empty: true, required: false, default: 'no description for this Permission ' };
    routes: Array <Route>;
    data: { type: string, empty: true, required: false, default: '' };

}