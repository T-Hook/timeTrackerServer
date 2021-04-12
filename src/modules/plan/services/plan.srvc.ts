import { Plan } from '../models/plan';
import * as bcrypt from 'bcryptjs';
import PlanRepository, { PlanType } from '../schemas/plan.schema';


/**
 * @class PlanService
 */
class PlanService {


    /**
     * @description Saves the plan in the storage
     * @param {Plan} plan
     * @returns {Promise<Plan>}
     */
    async save(plan: Plan): Promise<Plan> {
        return (await new PlanRepository(plan).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all plans from the storage
     * @returns {Promise<Plan[]>}
     */
    async findAll(): Promise<Plan[]> {
        return await PlanRepository.find({}).populate('rules')  as Plan[];
    }

    async updatePlan(id , plan): Promise<Plan> {
        return await PlanRepository.update({_id: id}, plan) as Plan;
    }

    /**
     * @param id
     */
    async findOneById(id): Promise<Plan> {
        return await PlanRepository.findOne({_id: id}).populate('rules')  as Plan;
    }

    /**
     * @param user
     * @param idPlan
     * @returns {Promise<Plan[]>}
     */
    async findOneByIdAndOwnerId(user, idPlan): Promise<Plan> {
        return await PlanRepository.findOne({idUser: user._id, _id: idPlan}).populate('rules')  as Plan;
    }
    /**
     * @description Fetches single plan from the storage by id plan
     * @returns {Promise<Plan>}
     */
    async findById(planId): Promise<Plan> {
        const plan: PlanType = await PlanRepository.findOne({_id: planId});
        return plan;
    }
    /**
     * @description Fetches all plans from the storage
     * @returns {Promise<Plan>}
     */
    async find(user, planId): Promise<Plan> {
        return await PlanRepository.findOne({idUser: user._id, _id: planId}) as Plan;
    }

    /**
     * @description Compares encrypted and decrypted passwords
     * @param {string} candidatePassword
     * @param storedPassword
     * @returns {boolean}
     */
    comparePassword(candidatePassword: string, storedPassword): boolean {
        return bcrypt.compareSync(candidatePassword, storedPassword);
    }

    /**
     * @description Deletes a Plan
     * @returns {Promise<void>}
     */
    async deleteOneById(id: string): Promise<void> {
        return await PlanRepository.deleteOne({_id: id});
    }
}


export default new PlanService();
