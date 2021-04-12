import { User } from '../../user/models/user';
import { Group } from './group';
import { Plan } from '../../plan/models/plan';
import { Company } from '../../company/models/company';

export interface GroupPlan {

    data: { type: object, empty: false, required: true };
    idPlan: Plan;
    idGroup: Group;
    idOwner: User;
    companyId: Company;

}
