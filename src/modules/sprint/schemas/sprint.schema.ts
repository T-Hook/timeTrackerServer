import * as mongoose from 'mongoose';
import { Sprint } from '../models/sprint';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { User } from '../../user/models/user';
import { Task } from '../../task/models/task';
import { Project } from '../../project/models/project';
import { Company } from '../../company/models/company';
import { ProjectUser } from '../../project/models/projectUser';
export type SprintType = Sprint & mongoose.Document;

const SprintSchema = new mongoose.Schema({
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: true, required: false},
    description: {type: String, empty: true, required: false},
    type: {type: String, empty: true, required: false},
    value: {type: String, empty: true, required: false},
    dateStart: {type: String, empty: true, required: false},
    dateFirstStart: {type: String, empty: true, required: false},
    dateLastUpdate: {type: String, empty: true, required: false},
    dateEnd: {type: String, empty: true, required: false},
    priority: {type: Number, empty: true, required: false},
    progress: {type: Number, empty: true, required: false},
    status: {type: String, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idTask: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    idProject: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    idProjectUser: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
}, {timestamps: true});

SprintSchema.pre('save', function save(next) {
    const sprint = this;
    next();
});


const SprintRepository = mongoose.model<SprintType>('Sprint', SprintSchema);
export default SprintRepository;
