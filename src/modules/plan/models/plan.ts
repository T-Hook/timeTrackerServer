import { User } from '../../user/models/user';
import { int } from 'aws-sdk/clients/datapipeline';
import { Rule } from '../../rule/models/rule';

export interface Plan {

    name: { type: string, empty: false, required: true };
    description: { type: string, empty: false, required: true };
    rules: Array <Rule>;
    expireIn: { type: object, empty: true, required: false };
    data: { type: object, empty: true, required: false };
    type: { type: string, empty: true, required: false };
    price: { type: number, empty: true, required: false };
    idUser: User

}
