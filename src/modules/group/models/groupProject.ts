import { User } from '../../user/models/user';
import { Group } from './group';
import { Project } from 'aws-sdk/clients/devicefarm';
import { Company } from '../../company/models/company';

export interface GroupProject {

    data: { type: object, empty: false, required: true };
    acl: {
        type: [{
            type: String
        }],
        length: 40,
        empty: false, required: true, default: ['get']
    };
    idProject: Project;
    idGroup: Group;
    companyId: Company;
    idOwner: User;

}
