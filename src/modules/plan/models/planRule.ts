import { User } from '../../user/models/user';
import { Rule } from '../../rule/models/rule';
import { Plan } from './plan';

export interface PlanRule {

    data: { type: object, empty: false, required: true };
    name: { type: string, empty: false, required: true };
    description: { type: string, empty: false, required: true };
    idPlan: Plan;
    idRule: Rule;
    idOwner: User;

}
