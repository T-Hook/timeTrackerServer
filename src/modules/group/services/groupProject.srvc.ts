import { GroupProject } from '../models/groupProject';
import { Group } from '../models/group';
import GroupProjectRepository, { GroupProjectType } from '../schemas/groupProject.schema';
import GroupRepository, { GroupType } from '../schemas/group.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';
import GroupUserRepository from '../schemas/groupUser.schema';
import { GroupUser } from '../models/groupUser';


/**
 * @class GroupProjectService
 */
class GroupProjectService {


    /**
     * @description Saves the group in the storage
     * @param {GroupProject} GroupProject
     * @returns {Promise<GroupProject>}
     */
    async save(groupProject: GroupProject): Promise<GroupProject> {
        return (await new GroupProjectRepository(groupProject).save()).toObject({virtuals: true});
    }

    /**
     * @param groupId
     */
    async getAllProjectInGroup(groupId): Promise<GroupProject[]> {
        return await GroupProjectRepository.find({idGroup: groupId})
            .populate('idProject') as GroupProject[];
    }
    /**
     * @description Saves the group in the storage
     * @param {GroupProject} GroupProject
     * @returns {Promise<GroupProject>}
     */
    async findAndUpdate(groupProject: GroupProject): Promise<GroupProject> {
        return await GroupProjectRepository.findOneAndUpdate({
            idGroup: groupProject.idGroup,
            idProject: groupProject.idProject
        }, {acl: groupProject.acl}, {new: false});
    }
    async delete(id) {
        return await GroupProjectRepository.deleteOne({
            _id: id
        });
    }
    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group>}
     */
    async findByProjectAndGroup(projectId, groupId): Promise<GroupProject> {
        return await GroupProjectRepository.findOne({idProject: projectId, idGroup: groupId}) as GroupProject;
    }
}

export default new GroupProjectService();
