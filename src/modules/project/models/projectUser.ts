import { User } from '../../user/models/user';
import { Project } from './project';

export interface ProjectUser {

    data: { type: object, empty: false, required: true };
    acl: {
        type: [{
            type: String
        }],
        length: 40,
        empty: false, required: true, default: ['get']
    };
    idUser: User;
    idProject: Project;
    idOwner: User;

}