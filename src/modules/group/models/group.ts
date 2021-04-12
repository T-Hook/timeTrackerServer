import { User } from '../../user/models/user';
import * as mongoose from 'mongoose';
import { Plan } from '../../plan/models/plan';
import { Company } from '../../company/models/company';

export interface Group {

    idPlan: Plan;
    expireIn: { type: object, empty: true, required: false };
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    phone: { type: string, empty: true, required: false };
    phone2: { type: string, empty: true, required: false };
    website: { type: string, empty: true, required: false };
    address: { type: string, empty: true, required: false };
    address2: { type: string, empty: true, required: false };
    region: { type: string, empty: true, required: false };
    companyId?: Company;
    idUser: User

}
