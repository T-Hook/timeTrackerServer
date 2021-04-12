import { GroupPlan } from '../models/groupPlan';
import { Group } from '../models/group';
import GroupPlanRepository, { GroupPlanType } from '../schemas/groupPlan.schema';
import GroupRepository, { GroupType } from '../schemas/group.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';
import { GroupProject } from '../models/groupProject';
import GroupProjectRepository from '../schemas/groupProject.schema';
import GroupUserRepository from '../schemas/groupUser.schema';


/**
 * @class GroupPlanService
 */
class GroupPlanService {


    /**
     * @description Saves the group in the storage
     * @param {GroupPlan} GroupPlan
     * @returns {Promise<GroupPlan>}
     */
    async save(groupPlan: GroupPlan): Promise<GroupPlan> {
        return (await new GroupPlanRepository(groupPlan).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the group in the storage
     * @param {GroupPlan} GroupPlan
     * @returns {Promise<GroupPlan>}
     */
    async findAndUpdate(groupPlan: GroupPlan): Promise<GroupPlan> {
        return await GroupPlanRepository.findOneAndUpdate({
            idGroup: groupPlan.idGroup,
            idUser: groupPlan.idPlan
        }, {data: groupPlan.data}, {new: false});
    }

    async delete(id) {
        return await GroupPlanRepository.deleteOne({
            _id: id
        });
    }

    async findAllShared(userId): Promise<GroupPlan[]> {
        return await GroupPlanRepository.find({idUser: userId}).populate('Group') as GroupPlan[];
    }

    /**
     * @param groupId
     */
    async getAllPlanInGroup(groupId): Promise<GroupPlan[]> {
        return await GroupPlanRepository.find({idGroup: groupId})
            .populate({
                path: 'idPlan',
                model: 'Plan',
                populate: {
                    path: 'rules',
                    model: 'Rule'
                }
            }) as GroupPlan[];
    }

    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group>}
     */
    async findByUserAndGroup(userId, groupId): Promise<GroupPlan> {
        return await GroupPlanRepository.findOne({idUser: userId, idGroup: groupId}) as GroupPlan;
    }

    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<GroupPlan>}
     */
    async findByPlanAndGroup(planId, groupId): Promise<GroupPlan> {
        return await GroupPlanRepository.findOne({idPlan: planId, idGroup: groupId}) as GroupPlan;
    }
}

export default new GroupPlanService();
