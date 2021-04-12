import * as mongoose from 'mongoose';
import { Profile } from '../models/profile';

export type ProfileType = Profile & mongoose.Document;

const ProfileSchema = new mongoose.Schema({
    info: {type: String, empty: true, required: false},
    fname: {type: String, empty: false, required: true},
    lname: {type: String, empty: false, required: true},
}, {timestamps: true});

ProfileSchema.pre('save', function save(next) {
    const profile = this;
    next();
});



const ProfileRepository = mongoose.model<ProfileType>('Profile', ProfileSchema);
export default ProfileRepository;