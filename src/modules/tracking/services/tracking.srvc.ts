import { Tracking } from '../models/tracking';
import TrackingRepository from '../schemas/tracking.schema';

/**
 * @class TrackingService
 */
class TrackingService {


    /**
     * @description Saves the tracking in the storage
     * @param {Tracking} tracking
     * @returns {Promise<Tracking>}
     */
    async save(tracking: Tracking): Promise<Tracking> {
        return (await new TrackingRepository(tracking).save()).toObject({virtuals: true});
    }


    /**
     * @description Fetches all trackings from the storage
     * @returns {Promise<Tracking[]>}
     */
    async findAll(): Promise<Tracking[]> {
        return await TrackingRepository.find({}).limit(100) as Tracking[];
    }

    /**
     * @param user
     * @param idTracking
     * @returns {Promise<Tracking[]>}
     */
    async findOneByIdAndOwnerId(user, idTracking): Promise<Tracking> {
        return await TrackingRepository.findOne({idUser: user._id, _id: idTracking}) as Tracking;
    }

    /**
     * @param user
     * @param idTracking
     */
    async findOneById(idTracking): Promise<Tracking> {
        return await TrackingRepository.findOne({_id: idTracking}) as Tracking;
    }

    /**
     * @description Fetches all trackings from the storage
     * @returns {Promise<Tracking>}
     */
    async find(user, trackingId): Promise<Tracking> {
        return await TrackingRepository.findOne({idUser: user._id, _id: trackingId}) as Tracking;
    }

}

export default new TrackingService();
