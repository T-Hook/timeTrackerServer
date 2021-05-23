import * as mongoose from 'mongoose';
import { Task } from '../models/task';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { ProjectUser } from '../../project/models/projectUser';
import { Project } from '../../project/models/project';
import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';
import { Sprint } from '../../sprint/models/sprint';
export type TaskType = Task & mongoose.Document;

const TaskSchema = new mongoose.Schema({
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: true, required: false},
    description: {type: String, empty: true, required: false},
    type: {type: String, empty: true, required: false},
    value: {type: String, empty: true, required: false},
    datestart: {type: String, empty: true, required: false},
    dateend: {type: String, empty: true, required: false},
    status: {type: String, empty: true, required: false},
    state: {type: String, empty: true, required: false},
    idProjectUser: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'},
    idProject: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
}, {timestamps: true});

TaskSchema.pre('save', function save(next) {
    const task = this;
    next();
});


const TaskRepository = mongoose.model<TaskType>('Task', TaskSchema);
export default TaskRepository;
