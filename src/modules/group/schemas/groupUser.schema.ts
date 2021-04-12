import * as mongoose from 'mongoose';
import { Group } from '../models/group';
import { GroupUser } from '../models/groupUser';
import { User } from '../../user/models/user';

export type GroupUserType = GroupUser & mongoose.Document;

const GroupUserSchema = new mongoose.Schema({
    data: {type: Object, empty: false, required: true},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    acl: {type: Array, empty: false, required: true, default: 'get', enum: ['get', 'put', 'post', 'delete', 'share']},
}, {timestamps: true});

GroupUserSchema.pre('save', function save(next) {
    const groupUser = this;
    next();
});

GroupUserSchema.on('error', function save(next) {
    const groupUser = this;
    next();
});
// GroupUserSchema.index({idUser: 1, idGroup: 1}, {unique: true});
const GroupUserRepository = mongoose.model<GroupUserType>('GroupUser', GroupUserSchema);
export default GroupUserRepository;
