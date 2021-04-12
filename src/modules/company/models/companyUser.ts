import { User } from '../../user/models/user';
import { Company } from './company';

export interface CompanyUser {

    data: { type: object, empty: false, required: true };
    acl: {
        type: [{
            type: String
        }],
        length: 40,
        empty: false, required: true, default: ['get']
    };
    idUser: User;
    idCompany: Company;
    idOwner: User;

}
