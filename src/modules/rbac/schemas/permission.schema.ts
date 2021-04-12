import * as mongoose from 'mongoose';
import { Permission } from '../models/permission';
import { User } from '../../user/models/user';

export type PermissionType = Permission & mongoose.Document;

const PermissionSchema = new mongoose.Schema({
    name: {type: String, empty: false, required: true, index: { unique: true }},
    description: {type: String, empty: true, required: false, default: ''},
    routes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Route'}],
    data: {type: String, empty: true, required: false, default: ''},
}, {timestamps: true});

PermissionSchema.pre('save', function save(next) {
    const permission = this;
    next();
});


const PermissionRepository = mongoose.model<PermissionType>('Permission', PermissionSchema);
export default PermissionRepository;