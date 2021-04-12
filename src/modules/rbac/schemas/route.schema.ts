import * as mongoose from 'mongoose';
import { Route } from '../models/route';
import { User } from '../../user/models/user';

export type RouteType = Route & mongoose.Document;

const RouteSchema = new mongoose.Schema({
    name: {type: String, empty: false, required: true, index: { unique: true }},
    description: {type: String, empty: true, required: false, default: ''},
    url: {type: String, empty: false, required: true},
    method: {type: String, empty: false, required: true},
    data: {type: String, empty: true, required: false, default: ''},
    active: {type: Boolean, empty: false, required: false, default: false},
}, {timestamps: true});

RouteSchema.pre('save', function save(next) {
    const route = this;
    next();
});


const RouteRepository = mongoose.model<RouteType>('Route', RouteSchema);
export default RouteRepository;