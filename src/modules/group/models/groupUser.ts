import { User } from '../../user/models/user';
import { Group } from './group';
import { Company } from '../../company/models/company';

export interface GroupUser {

    data: { type: object, empty: false, required: true };
    acl: {
        type: [{
            type: String
        }],
        length: 40,
        empty: false, required: true, default: ['get']
    };
    idUser: User;
    idGroup: Group;
    companyId: Company;
    idOwner: User;

}
