import { User } from '../../user/models/user';
import { Permission } from './permission';

export interface Rbac {
    name: { type: string, empty: false, required: true, index: { unique: true } };
    description: { type: string, empty: true, required: false, default: 'no description for this Rbac ' };
    group: { type: string, empty: false, required: true, default: 'user' };
    permissions: Array <Permission>;
    data: { type: string, empty: true, required: false };

}