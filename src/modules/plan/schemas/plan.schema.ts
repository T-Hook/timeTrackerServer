import * as mongoose from 'mongoose';
import { Plan } from '../models/plan';
import { User } from '../../user/models/user';
import { Schema } from 'mongoose';

export type PlanType = Plan & mongoose.Document;

const PlanSchema = new mongoose.Schema({
    description: {type: String, empty: false, required: true},
    name: {type: String, empty: false, required: true},
    rules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rule'}],
    expireIn: {type: Object, empty: true, required: false},
    data: {type: Object, empty: true, required: false},
    type: {type: String, empty: true, required: false},
    price: {type: Number, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

PlanSchema.pre('save', function save(next) {
    const plan = this;
    next();
});


const PlanRepository = mongoose.model<PlanType>('Plan', PlanSchema);
export default PlanRepository;
