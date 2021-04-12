import * as mongoose from 'mongoose';
import { Group } from '../models/group';
import { GroupPlan } from '../models/groupPlan';
import { User } from '../../user/models/user';
import { Plan } from '../../plan/models/plan';
export type GroupPlanType = GroupPlan & mongoose.Document;

const GroupPlanSchema = new mongoose.Schema({
    data: {type: Object, empty: false, required: true},
    idPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'},
    idGroup: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    }, {timestamps: true});

GroupPlanSchema.pre('save', function save(next) {
    const groupPlan = this;
    next();
});

GroupPlanSchema.on('error', function save(next) {
    const groupPlan = this;
    next();
});
// GroupPlanSchema.index({idUser: 1, idGroup: 1}, {unique: true});
const GroupPlanRepository = mongoose.model<GroupPlanType>('GroupPlan', GroupPlanSchema);
export default GroupPlanRepository;
