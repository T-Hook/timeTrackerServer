import * as mongoose from 'mongoose';
import { Updates } from '../models/updates';
export type UpdatesType = Updates & mongoose.Document;

const UpdatesSchema = new mongoose.Schema({
    date: {type: Object, empty: true, required: false},
    description: {type: String, empty: true, required: false},
}, {timestamps: true});

UpdatesSchema.pre('save', function save(next) {
    const updates = this;
    next();
});
const UpdatesRepository = mongoose.model<UpdatesType>('Updates', UpdatesSchema);
export default UpdatesRepository;
