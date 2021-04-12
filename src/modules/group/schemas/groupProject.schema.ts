import * as mongoose from 'mongoose';
import { Group } from '../models/group';
import { GroupProject } from '../models/groupProject';
import { User } from '../../user/models/user';
import { Project } from '../../project/models/project';
export type GroupProjectType = GroupProject & mongoose.Document;

const GroupProjectSchema = new mongoose.Schema({
    data: {type: Object, empty: false, required: true},
    idProject: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    idGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    acl: {type: Array, empty: false, required: true, default: 'get', enum: ['get', 'put', 'post', 'delete', 'share']},
}, {timestamps: true});

GroupProjectSchema.pre('save', function save(next) {
    const groupProject = this;
    next();
});

GroupProjectSchema.on('error', function save(next) {
    const groupProject = this;
    next();
});
// GroupProjectSchema.index({idProject: 1, idGroup: 1}, {unique: true});
const GroupProjectRepository = mongoose.model<GroupProjectType>('GroupProject', GroupProjectSchema);
export default GroupProjectRepository;
