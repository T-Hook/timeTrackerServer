import * as mongoose from 'mongoose';
import { Mail } from '../models/mail';
export type MailType = Mail & mongoose.Document;

const MailSchema = new mongoose.Schema({
    message: {type: String, empty: true, required: false},
    date: {type: String, empty: true, required: false},
    idS: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idR: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true});

MailSchema.pre('save', function save(next) {
    const mail = this;
    next();
});


const MailRepository = mongoose.model<MailType>('Mail', MailSchema);
export default MailRepository;
