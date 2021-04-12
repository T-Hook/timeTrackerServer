import * as mongoose from 'mongoose';
import { Project } from '../models/project';
import { ProjectUser } from '../models/projectUser';
import { User } from '../../user/models/user';

export type ProjectUserType = ProjectUser & mongoose.Document;

const ProjectUserSchema = new mongoose.Schema({
    data: {type: Object, empty: false, required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idProject: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    acl: {type: Array, empty: false, required: true, default: 'get', enum: ['get', 'put', 'post', 'delete', 'share']},
}, {timestamps: true});

ProjectUserSchema.pre('save', function save(next) {
    const projectUser = this;
    next();
});

ProjectUserSchema.on('error', function save(next) {
    const projectUser = this;
    next();
});
ProjectUserSchema.index({idUser: 1, idProject: 1}, {unique: true});
const ProjectUserRepository = mongoose.model<ProjectUserType>('ProjectUser', ProjectUserSchema);
export default ProjectUserRepository;