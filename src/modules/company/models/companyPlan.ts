import { User } from '../../user/models/user';
import { Company } from './company';
import { Plan } from '../../plan/models/plan';

export interface CompanyPlan {

    data: { type: object, empty: false, required: true };
    name: { type: string, empty: false, required: true };
    description: { type: string, empty: false, required: true };
    dateStart: { type: string, empty: false, required: true };
    dateEnd: { type: string, empty: false, required: true };
    record: { type: object, empty: false, required: true };
    idPlan: Plan;
    idCompany: Company;
    idOwner: User;

}
