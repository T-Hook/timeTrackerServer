import * as mongoose from 'mongoose';
import { Group } from '../models/group';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';

export type GroupType = Group & mongoose.Document;

const GroupSchema = new mongoose.Schema({
    idPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'},
    expireIn: {type: Object, empty: true, required: false},
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: true, required: false},
    description: {type: String, empty: true, required: false},
    phone: {type: String, empty: true, required: false},
    phone2: {type: String, empty: true, required: false},
    website: {type: String, empty: true, required: false},
    address: {type: String, empty: true, required: false},
    address2: {type: String, empty: true, required: false},
    region: {type: String, empty: true, required: false},
    companyId: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

GroupSchema.pre('save', function save(next) {
    const group = this;
    next();
});


const GroupRepository = mongoose.model<GroupType>('Group', GroupSchema);
export default GroupRepository;
