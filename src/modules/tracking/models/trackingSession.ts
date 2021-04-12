import { User } from '../../user/models/user';
import { ProjectUser } from '../../project/models/projectUser';
import * as mongoose from 'mongoose';
import { Plan } from '../../plan/models/plan';
import { Route } from '../../rbac/models/route';
import { CompanyUser } from '../../company/models/companyUser';
import { Sprint } from '../../sprint/models/sprint';

export interface TrackingSession {
    trackingId: {type: number, empty: false, unique: true, required: true},
    totalKeyPress: {type: number, empty: true, required: false};
    totalMouseClick: {type: number, empty: true, required: false};
    totalTracking: {type: number, empty: true, required: false, default: 0};
    trackingRank: {type: number, empty: true, required: false, default: 0};
    elapsedTime: {type: number, empty: true, required: false, default: 0};
    trackingPaused: {type: number, empty: true, required: false},
    idUser: User,
    idProjectUser: ProjectUser,
    idCompany: CompanyUser,
    idSprint: Sprint

}
