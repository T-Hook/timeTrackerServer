import { User } from '../../user/models/user';
import { ProjectUser } from '../../project/models/projectUser';
import * as mongoose from 'mongoose';
import { Plan } from '../../plan/models/plan';
import { Route } from '../../rbac/models/route';

export interface Windows {
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    type: { type: string, empty: true, required: false };
    value: { type: string, empty: true, required: false };
    date: {type: string, empty: true, required: false};
    keyPress: {type: number, empty: true, required: false};
    mouseClick: {type: number, empty: true, required: false};
    screen: {type: string, empty: true, required: false},
    // screen: { type: Buffer, contentType: String },
    psList: {type: Array < object>, empty: true, required: false},
    usedMemory: {type: number, empty: true, required: false},
    allOpenedWindows: {type: Array <object>, empty: true, required: false},
    idUser: User,
    idProjectUser: ProjectUser

}
