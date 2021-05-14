import * as mongoose from 'mongoose';
import { Tracking } from '../models/tracking';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { ProjectUser } from '../../project/models/projectUser';
import { User } from '../../user/models/user';
import { CompanyUser } from '../../company/models/companyUser';
import { Company } from '../../company/models/company';
import { Sprint } from '../../sprint/models/sprint';
const mongoosePaginate = require('mongoose-paginate');
import { default as TrackingSessionService } from '../services/trackingSession.srvc';

export type TrackingType = Tracking & mongoose.Document;

const TrackingSchema = new mongoose.Schema({
    trackingId: {type: Number, empty: false, required: true},
    trackingRank: {type: Number, empty: true, required: false},
    trackingPaused: {type: Number, empty: true, required: false},
    elapsedTime: {type: Number, empty: false, required: true},
    data: {type: Object, empty: true, required: false},
    name: {type: String, empty: true, required: false},
    description: {type: String, empty: true, required: false},
    type: {type: String, empty: true, required: false},
    value: {type: String, empty: true, required: false},
    date: {type: String, empty: true, required: false},
    keyPress: {type: Number, empty: true, required: false},
    activeSession: {type: Number, empty: true, required: false},
    mouseClick: {type: Number, empty: true, required: false},
    totalKeyPress: {type: Number, empty: true, required: false},
    totalMouseClick: {type: Number, empty: true, required: false},
    screen: {type: String, empty: true, required: false},
    datestart: {type: String, empty: true, required: false},
    dateend: {type: String, empty: true, required: false},
    time: {type: String, empty: true, required: false},
    hours: {type: String, empty: true, required: false},
    minutes: {type: String, empty: true, required: false},
    seconds: {type: String, empty: true, required: false},
    // screen: { type: Buffer, contentType: String },
    psList: {type: Array, empty: true, required: false},
    usedMemory: {type: Number, empty: true, required: false},
    allOpenedWindows: {type: Array, empty: true, required: false},
    idProjectUser: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    idCompany: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    idSprint: {type: mongoose.Schema.Types.ObjectId, ref: 'Sprint'}
}, {timestamps: true});
TrackingSchema.plugin(mongoosePaginate);
TrackingSchema.pre('save', async function save(next) {
    const tracking = this;
    const trackingSession = await TrackingSessionService.saveIfNotExist(tracking);
    console.log('trackingSession', trackingSession);
    console.log('trackingId ', tracking.trackingId);
    console.log('trackingRank', tracking.trackingRank);
    console.log('trackingPaused', tracking.trackingPaused);
    console.log('keyPress', tracking.keyPress);
    console.log('mouseClick', tracking.mouseClick);
    console.log('totalKeyPress', tracking.totalKeyPress);
    console.log('totalMouseClick', tracking.totalMouseClick);
    console.log('usedMemory', tracking.usedMemory);
    console.log('date Start tracking', tracking.datestart);
    console.log('date end tracking', tracking.dateend);
    console.log('time spending during work !', tracking.time);
    console.log('time spending during work per hour ', tracking.hours);
    console.log('time spending during work per minute', tracking.minutes);
    console.log('time spending during work per seconds', tracking.seconds);
    console.log('allOpenedWindows', tracking.allOpenedWindows.length);
    console.log('psList', tracking.psList.length);
    next();
});


const TrackingRepository = mongoose.model<TrackingType>('Tracking', TrackingSchema);
export default TrackingRepository;
