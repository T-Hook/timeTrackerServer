import * as mongoose from 'mongoose';
import { Rbac } from '../models/rbac';
import { User } from '../../user/models/user';

export type RbacType = Rbac & mongoose.Document;

const RbacSchema = new mongoose.Schema({
    name: {type: String, empty: false, required: true, index: { unique: true }},
    description: {type: String, empty: true, required: false, default: ''},
    group: {type: String, empty: false, required: true},
    permissions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Permission'}],
    data: {type: String, empty: true, required: false, default: ''},
}, {timestamps: true});

RbacSchema.pre('save', function save(next) {
    const rbac = this;
    next();
});
RbacSchema.pre('find', function save(next) {
    const rbac = this;
    next();
});
RbacSchema.pre('findAll', function save(next) {
    const rbac = this;
    next();
});

const RbacRepository = mongoose.model<RbacType>('Rbac', RbacSchema);
export default RbacRepository;