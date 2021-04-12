import { User } from '../../user/models/user';
import { ProjectUser } from '../../project/models/projectUser';
import * as mongoose from 'mongoose';
import { Plan } from '../../plan/models/plan';
import { Route } from '../../rbac/models/route';
import { CompanyUser } from '../../company/models/companyUser';
import { Sprint } from '../../sprint/models/sprint';

export interface Tracking {
    trackingId: {type: number, empty: true, required: false};
    trackingRank: {type: number, empty: true, required: false};
    trackingPaused: {type: number, empty: true, required: false};
    elapsedTime: {type: number, empty: false, required: true};
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    activeSession: {type: number, empty: false, required: true};
    type: { type: string, empty: true, required: false };
    value: { type: string, empty: true, required: false };
    date: {type: string, empty: true, required: false};
    keyPress: {type: number, empty: true, required: false};
    totalKeyPress: {type: number, empty: true, required: false};
    totalMouseClick: {type: number, empty: true, required: false};
    screen: {type: string, empty: true, required: false},
    // screen: { type: Buffer, contentType: String },
    psList: {type: Array <any>, empty: true, required: false},
    usedMemory: {type: number, empty: true, required: false},
    allOpenedWindows: {type: Array <any>, empty: true, required: false},
    idUser: User,
    idProjectUser: ProjectUser,
    idCompany: CompanyUser,
    idSprint: Sprint

}
