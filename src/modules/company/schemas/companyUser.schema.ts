import * as mongoose from 'mongoose';
import { Company } from '../models/company';
import { CompanyUser } from '../models/companyUser';
import { User } from '../../user/models/user';

export type CompanyUserType = CompanyUser & mongoose.Document;

const CompanyUserSchema = new mongoose.Schema({
    data: {type: Object, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    idOwner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    acl: {type: Array, empty: false, required: true, default: 'get', enum: ['get', 'put', 'post', 'delete', 'share']},
}, {timestamps: true});

CompanyUserSchema.pre('save', function save(next) {
    const companyUser = this;
    next();
});

CompanyUserSchema.on('error', function save(next) {
    const companyUser = this;
    next();
});
// CompanyUserSchema.index({idUser: 1, idCompany: 1}, {unique: true});
const CompanyUserRepository = mongoose.model<CompanyUserType>('CompanyUser', CompanyUserSchema);
export default CompanyUserRepository;
