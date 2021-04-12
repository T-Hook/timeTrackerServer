import * as mongoose from 'mongoose';
import { Notification } from '../models/notification';
import { Plan } from '../../plan/models/plan';
import { Schema } from 'mongoose';
import { User } from '../../user/models/user';
export type NotificationType = Notification & mongoose.Document;

const NotificationSchema = new mongoose.Schema({
    data: {type: Object, empty: true, required: true},
    description: {type: String, empty: true, required: false},
    date: {type: String, empty: true, required: false},
    idUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

NotificationSchema.pre('save', function save(next) {
    const notification = this;
    next();
});

const NotificationRepository = mongoose.model<NotificationType>('Notification', NotificationSchema);
export default NotificationRepository;
