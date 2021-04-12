import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';
import { int } from 'aws-sdk/clients/datapipeline';
import { float } from 'aws-sdk/clients/lightsail';

export interface Rule {

    name: { type: string, empty: false, required: true };
    type: { type: string, empty: false, required: true };
    description: { type: string, empty: false, required: true };
    value: { type: number, empty: true, required: false };
    idUser: User;
    idCompny: Company;

}
