import * as mongoose from 'mongoose';
import { Project } from '../models/project';
import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';
export type ProjectType = Project & mongoose.Document;

const ProjectSchema = new mongoose.Schema({
    name: {type: Object, empty: false, required: true},
    description: {type: Object, empty: true, required: false},
    meta: {type: Object, empty: true, required: false},
    data: {type: Object,  empty: true, required: false},
    scaling: {type: Object, empty: true, required: false},
    device: {type: Object, empty: true, required: false},
    dashboard: {type: Object, empty: true, required: false},
    connections: {type: Object, empty: true, required: false},
    exportOptions: {type: String, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: false}
}, {timestamps: true});

ProjectSchema.pre('save', function save(next) {
    const project = this;
    next();
});

ProjectSchema.index({name: 1, idCompany: 1}, {unique: true});
ProjectSchema.index({name: 1, idUser: 1}, {unique: true});
const ProjectRepository = mongoose.model<ProjectType>('Project', ProjectSchema);
export default ProjectRepository;
