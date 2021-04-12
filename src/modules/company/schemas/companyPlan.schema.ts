import * as mongoose from 'mongoose';
import { Company } from '../models/company';
import { CompanyPlan } from '../models/companyPlan';
import { User } from '../../user/models/user';
import { Plan } from '../../plan/models/plan';

export type CompanyPlanType = CompanyPlan & mongoose.Document;

const CompanyPlanSchema = new mongoose.Schema({
    data: {type: Object, empty: false, required: true},
    name: {type: String, empty: false, required: true},
    description: {type: String, empty: false, required: true},
    dateStart: {type: String, empty: false, required: true},
    dateEnd: {type: String, empty: false, required: true},
    record: {type: Object, empty: false, required: true},
    idPlan: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Plan'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
}, {timestamps: true});

CompanyPlanSchema.pre('save', function save(next) {
    const companyPlan = this;
    next();
});

CompanyPlanSchema.on('error', function save(next) {
    const companyPlan = this;
    next();
});
CompanyPlanSchema.index({idPlan: 1, idCompany: 1}, {unique: true});
const CompanyPlanRepository = mongoose.model<CompanyPlanType>('CompanyPlan', CompanyPlanSchema);
export default CompanyPlanRepository;
