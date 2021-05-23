import { User } from '../../user/models/user';
import { ProjectUser } from '../../project/models/projectUser';
import { Project } from '../../project/models/project';
import { Company } from '../../company/models/company';
import { Updates } from './updates';
export interface Task {
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    type: { type: string, empty: true, required: false };
    value: { type: string, empty: true, required: false };
    datestart: {type: string, empty: true, required: false};
    dateend: {type: string, empty: true, required: false};
    status: {type: string, empty: true, required: false, default: ' unfinished'};
    state: {type: string, empty: true, required: false, default: ' unfinished'};
    updates: Array <Updates>;
    idUser: User,
    idProjectUser: ProjectUser,
    idProject: Project,
    idCompany: Company

}
