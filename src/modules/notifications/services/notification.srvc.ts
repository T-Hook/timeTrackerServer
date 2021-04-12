import { Notification } from '../models/notification';
import NotificationRepository from '../schemas/notification.schema';

/**
 * @class NotificationService
 */
class NotificationService {


    /**
     * @description Saves the notification in the storage
     * @param {Notification} notification
     * @returns {Promise<Notification>}
     */
    async save(notification: Notification): Promise<Notification> {
        return (await new NotificationRepository(notification).save()).toObject({virtuals: true});
    }


    /**
     * @description Fetches all notifications from the storage
     * @returns {Promise<Notification[]>}
     */
   async findAll(): Promise<Notification[]> {
        return await NotificationRepository.find({}).populate(
            {
                path: 'idUser',
                model: 'User'
            }) as Notification[];
    }

    async update(id , notification): Promise<Notification> {
        return await NotificationRepository.update({_id: id}, notification) as Notification;
    }

    async deleteOneById(id: string): Promise<void> {
        return await NotificationRepository.deleteOne({_id: id});
    }
    /**
     * @param user
     * @param idNotification
     * @returns {Promise<Notification[]>}
     */
    async findOneByIdAndOwnerId(user, idNotification): Promise<Notification> {
        return await NotificationRepository.findOne({idUser: user._id, _id: idNotification}) as Notification;
    }

    /**
     * @param user
     * @param idNotification
     */
    async findOneById( idNotification): Promise<Notification> {
        return await NotificationRepository.findOne({ _id: idNotification}) as Notification;
    }

    /**
     * @description Fetches all notifications from the storage
     * @returns {Promise<Notification>}
     */
    async find(user, notificationId): Promise<Notification> {
        return await NotificationRepository.findOne({idUser: user._id, _id: notificationId}) as Notification;
    }

}

export default new NotificationService();
