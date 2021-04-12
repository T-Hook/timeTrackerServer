import * as mongoose from 'mongoose';
import { Rule } from '../models/rule';
import { User } from '../../user/models/user';
import { Schema } from 'mongoose';
import { int } from 'aws-sdk/clients/datapipeline';
import { float } from 'aws-sdk/clients/lightsail';

export type RuleType = Rule & mongoose.Document;

const RuleSchema = new mongoose.Schema({
    description: {type: String, empty: false, required: true},
    name: {type: String, empty: false, required: true},
    type: {type: String, empty: false, required: true},
    value: {type: Number, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'}
}, {timestamps: true});

RuleSchema.pre('save', function save(next) {
    const rule = this;
    next();
});


const RuleRepository = mongoose.model<RuleType>('Rule', RuleSchema);
export default RuleRepository;
