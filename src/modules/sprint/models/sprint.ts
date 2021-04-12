import { User } from '../../user/models/user';
import * as mongoose from 'mongoose';
import { Plan } from '../../plan/models/plan';
import { Task } from '../../task/models/task';
import { Project } from '../../project/models/project';
import { ProjectUser } from '../../project/models/projectUser';
import { Company } from '../../company/models/company';

export interface Sprint {
    data: { type: object, empty: true, required: false };
    name: { type: string, empty: true, required: false };
    description: { type: string, empty: true, required: false };
    type: { type: string, empty: true, required: false };
    value: { type: string, empty: true, required: false };
    dateStart: { type: string, empty: true, required: false };
    dateFirstStart: { type: string, empty: true, required: false };
    dateLastUpdate: { type: string, empty: true, required: false };
    dateEnd: { type: string, empty: true, required: false };
    priority: { type: number, empty: true, required: false };
    progress: { type: number, empty: true, required: false };
    status: { type: string, empty: true, required: false };
    idUser: User
    idTask: Task;
    idProject: Project;
    idProjectUser: ProjectUser;
    idCompany: Company;

}
