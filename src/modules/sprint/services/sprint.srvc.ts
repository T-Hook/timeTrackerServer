import { Sprint } from '../models/sprint';
import SprintRepository from '../schemas/sprint.schema';

/**
 * @class SprintService
 */
class SprintService {


    /**
     * @description Saves the sprint in the storage
     * @param {Sprint} sprint
     * @returns {Promise<Sprint>}
     */
    async save(sprint: Sprint): Promise<Sprint> {
        return (await new SprintRepository(sprint).save()).toObject({virtuals: true});
    }



    /**
     * @description Fetches all sprints from the storage
     * @returns {Promise<Sprint[]>}
     */
    async findAll(): Promise<Sprint[]> {
        return await SprintRepository.find({}) as Sprint[];
    }
    async update(id , sprint): Promise<Sprint> {
        return await SprintRepository.update({_id: id}, sprint) as Sprint;
    }

    async deleteOneById(id: string): Promise<void> {
        return await SprintRepository.deleteOne({_id: id});
    }
    /**
     * @param user
     * @param idSprint
     * @returns {Promise<Sprint[]>}
     */
    async findOneByIdAndOwnerId(user, idSprint): Promise<Sprint> {
        return await SprintRepository.findOne({idUser: user._id, _id: idSprint}) as Sprint;
    }

    /**
     * @param user
     * @param idSprint
     */
    async findOneById( idSprint): Promise<Sprint> {
        return await SprintRepository.findOne({ _id: idSprint}) as Sprint;
    }

    /**
     * @description Fetches all sprints from the storage
     * @returns {Promise<Sprint>}
     */
    async find(user, sprintId): Promise<Sprint> {
        return await SprintRepository.findOne({idUser: user._id, _id: sprintId}) as Sprint;
    }

}

export default new SprintService();
