import * as mongoose from 'mongoose';
import { Plan } from '../models/plan';
import { User } from '../../user/models/user';
import { Company } from '../../company/models/company';
import { Schema } from 'mongoose';
import { Rule } from '../../rule/models/rule';
import { PlanRule } from '../models/planRule';

export type PlanRuleType = PlanRule & mongoose.Document;

const PlanRuleSchema = new mongoose.Schema({
    description: {type: String, empty: false, required: true},
    name: {type: String, empty: false, required: true},
    data: {type: Object, empty: true, required: false},
    idPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'},
    idRule: {type: mongoose.Schema.Types.ObjectId, ref: 'Rule'},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

PlanRuleSchema.pre('save', function save(next) {
    const plan = this;
    next();
});

PlanRuleSchema.index({idRule: 1, idPlan: 1}, {unique: true});
const PlanRuleRepository = mongoose.model<PlanRuleType>('PlanRuleSchema', PlanRuleSchema);
export default PlanRuleRepository;
