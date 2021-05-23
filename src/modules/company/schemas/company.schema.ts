import * as mongoose from 'mongoose';
import { Company } from '../models/company';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { User } from '../../user/models/user';

export type CompanyType = Company & mongoose.Document;

const CompanySchema = new mongoose.Schema({
    idPlan: {type: mongoose.Schema.Types.ObjectId, ref: 'Plan'},
    expireIn: {type: Object, empty: true, required: false},
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: false, required: true, index: {unique: true}},
    description: {type: String, empty: true, required: false},
    email: {type: String, empty: true, required: false},
    phone: {type: String, empty: true, required: false, index: {unique: true}},
    phone2: {type: String, empty: true, required: false},
    website: {type: String, empty: true, required: false},
    address: {type: String, empty: true, required: false},
    address2: {type: String, empty: true, required: false},
    region: {type: String, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

CompanySchema.pre('save', function save(next) {
    const company = this;
    next();
});


const CompanyRepository = mongoose.model<CompanyType>('Company', CompanySchema);
export default CompanyRepository;
