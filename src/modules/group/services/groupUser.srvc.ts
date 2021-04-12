import { GroupUser } from '../models/groupUser';
import { Group } from '../models/group';
import GroupUserRepository, { GroupUserType } from '../schemas/groupUser.schema';
import GroupRepository, { GroupType } from '../schemas/group.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';


/**
 * @class GroupUserService
 */
class GroupUserService {


    /**
     * @description Saves the group in the storage
     * @param {GroupUser} GroupUser
     * @returns {Promise<GroupUser>}
     */
    async save(groupUser: GroupUser): Promise<GroupUser> {
        return (await new GroupUserRepository(groupUser).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the group in the storage
     * @param {GroupUser} GroupUser
     * @returns {Promise<GroupUser>}
     */
    async findAndUpdate(groupUser: GroupUser): Promise<GroupUser> {
        return await GroupUserRepository.findOneAndUpdate({
            idGroup: groupUser.idGroup,
            idUser: groupUser.idUser
        }, {acl: groupUser.acl}, {new: false}).populate(
            {
                path: 'idUser',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            }) ;
    }

    async delete(id) {
        return await GroupUserRepository.deleteOne({
            _id: id
        });
    }

    async findAllShared(userId): Promise<GroupUser[]> {
        return await GroupUserRepository.find({idUser: userId}).populate('Group') as GroupUser[];
    }

    async findAllUserInSharedGroup(userId, groupId): Promise<GroupUser[]> {
        const group = await GroupRepository.findById(groupId).populate('User') as Group;
        if (group.idUser === userId) {
            return await GroupUserRepository.find({groupId: groupId}).populate({
                path: 'idUser',
                model: 'User',
            }) as GroupUser[];
        } else {
            const role = await GroupUserRepository.findOne({idUser: userId, idGroup: groupId}) as GroupUser;
            if (role) {
                const findRole = _.findIndex(role.acl, function (o) {
                    return o === 'get';
                });
                if (findRole >= 0) {
                    return await GroupUserRepository.find({idGroup: groupId}).populate({
                        path: 'idUser',
                        model: 'User',
                    }) as GroupUser[];
                } else {
                    return [];
                }
            } else {
                return [];
            }
        }
    }

    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group>}
     */
    async findByUserAndGroup(userId, groupId): Promise<GroupUser> {
        return await GroupUserRepository.findOne({idUser: userId, idGroup: groupId}) as GroupUser;
    }
}

export default new GroupUserService();
