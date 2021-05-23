import { Updates } from '../models/updates';
import * as bcrypt from 'bcryptjs';
import UpdatesRepository from '../schemas/updates.schema';

/**
 * @class RouteService
 */
class UpdatesService {


    /**
     * @description Saves the updates in the storage
     * @param {Updates} updates
     * @returns {Promise<Updates>}
     */
    async save(updates: Updates): Promise<Updates> {
        return (await new UpdatesRepository(updates).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all updates from the storage
     * @returns {Promise<Updates[]>}
     */
    async findAll(user): Promise<Updates[]> {
        return await UpdatesRepository.find({}) as Updates[];
    }

    async count(name) {
        return await UpdatesRepository.count({name: name});
    }
    }
export default new UpdatesService();
