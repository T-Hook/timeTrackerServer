import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';

export interface Setting {
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    type: { type: string, empty: true, required: false };
    value: { type: string, empty: true, required: false };
    idUser: User,
    idCompany: Company

}
