import * as mongoose from 'mongoose';
import { TrackingSession } from '../models/trackingSession';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { ProjectUser } from '../../project/models/projectUser';
import { User } from '../../user/models/user';
import { CompanyUser } from '../../company/models/companyUser';
import { Company } from '../../company/models/company';
import { Sprint } from '../../sprint/models/sprint';
const mongoosePaginate = require('mongoose-paginate-v2');
export type TrackingSessionType = TrackingSession & mongoose.Document;

const TrackingSessionSchema = new mongoose.Schema({
    trackingId: {type: Number, empty: false, unique: true, required: true},
    totalKeyPress: {type: Number, empty: true, required: false},
    totalMouseClick: {type: Number, empty: true, required: false},
    totalTracking: {type: Number, empty: true, required: false, default: 0},
    trackingPaused: {type: Number, empty: true, required: false},
    trackingRank: {type: Number, empty: true, required: false, default: 0},
    elapsedTime: {type: Number, empty: true, required: false, default: 0},
    idProjectUser: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    idSprint: {type: mongoose.Schema.Types.ObjectId, ref: 'Sprint'}
}, {timestamps: true});

TrackingSessionSchema.pre('save', function save(next) {
    const trackingSession = this;
    next();
});

TrackingSessionSchema.plugin(mongoosePaginate);
const TrackingSessionRepository = mongoose.model<TrackingSessionType>('TrackingSession', TrackingSessionSchema);
export default TrackingSessionRepository;
