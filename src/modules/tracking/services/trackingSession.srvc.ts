import { TrackingSession } from '../models/trackingSession';
import TrackingSessionRepository from '../schemas/trackingSession.schema';
import { Tracking } from '../models/tracking';
import * as mongoose from 'mongoose';
import TrackingRepository from '../schemas/tracking.schema';

/**
 * @class TrackingSessionService
 */
class TrackingSessionService {


    /**
     * @description Saves the tracking session in the storage if not exist
     * @param {Tracking} trackingSession
     * @returns {Promise<TrackingSession>}
     */
    async save(trackingSession: TrackingSession): Promise<TrackingSession> {
        return (await new TrackingSessionRepository(trackingSession).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the tracking session in the storage if not exist
     * @param {Tracking} tracking
     * @returns {Promise<TrackingSession>}
     */
    async saveIfNotExist(tracking: Tracking): Promise<TrackingSession> {
        return await TrackingSessionRepository.update(
            {trackingId: tracking.trackingId},
            {
                $set: {
                    totalKeyPress: tracking.totalKeyPress,
                    totalMouseClick: tracking.totalMouseClick,
                    trackingPaused: tracking.trackingPaused,
                    trackingRank: tracking.trackingRank,
                },
                $setOnInsert: {
                    totalTracking: 1,
                    elapsedTime: tracking.elapsedTime,
                    idProjectUser: tracking.idProjectUser,
                    idUser: tracking.idUser,
                    idCompany: tracking.idCompany,
                    idSprint: tracking.idSprint
                },
                // $inc: {totalTracking: 1}
            },
            {upsert: true}
        );
    }

    /**
     * @param idSessionTracking
     */
    async findOneById(idSessionTracking): Promise<TrackingSession> {
        return await TrackingSessionRepository.findOne({_id: idSessionTracking}) as TrackingSession;
    }

    /**
     * @description Fetches all tracking session from the storage
     * @returns {Promise<TrackingSession[]>}
     */
    async findAll(): Promise<TrackingSession[]> {
        return await TrackingSessionRepository.find({}).limit(100) as TrackingSession[];
    }

    /**
     * @param trackingSessionId
     */
    async findTrackingListByTrackingSessionId(trackingSessionId , req): Promise<any[]> {
        console.log('req.query', req.query);
        console.log('req.__filter' , req.__filter );
        // @ts-ignore
        return await TrackingRepository.paginate({trackingId: trackingSessionId}, req.__filter,
            function (result) {
                return result;
            });
    }
}

export default new TrackingSessionService();
