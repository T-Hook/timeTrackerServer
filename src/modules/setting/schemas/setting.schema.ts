import * as mongoose from 'mongoose';
import { Setting } from '../models/setting';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { User } from '../../user/models/user';

export type SettingType = Setting & mongoose.Document;

const SettingSchema = new mongoose.Schema({
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: true, required: false},
    description: {type: String, empty: true, required: false},
    type: {type: String, empty: true, required: false},
    value: {type: String, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

SettingSchema.pre('save', function save(next) {
    const setting = this;
    next();
});


const SettingRepository = mongoose.model<SettingType>('Setting', SettingSchema);
export default SettingRepository;
