import { Group } from '../models/group';
import * as bcrypt from 'bcryptjs';
import GroupRepository from '../schemas/group.schema';
import GroupUserRepository from '../schemas/groupUser.schema';
import { GroupUser } from '../models/groupUser';

/**
 * @class GroupService
 */
class GroupService {


    /**
     * @description Saves the group in the storage
     * @param {Group} group
     * @returns {Promise<Group>}
     */
    async save(group: Group): Promise<Group> {
        return (await new GroupRepository(group).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group[]>}
     */
    async findAllInUser(user): Promise<Group[]> {
        return await GroupRepository.find({companyId: user.companyId._id}) as Group[];
    }
    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group[]>}
     */
    async findAll(): Promise<Group[]> {
        return await GroupRepository.find({}) as Group[];
    }

    async findUserRoleInGroup(idGroup): Promise<GroupUser[]> {
        return await GroupUserRepository.find({idGroup: idGroup}).populate(
            {
                path: 'idUser',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            }) as GroupUser[];
    }
    /**
     * @param user
     * @param idGroup
     * @returns {Promise<Group[]>}
     */
    async findOneByIdAndOwnerId(user, idGroup): Promise<Group> {
        return await GroupRepository.findOne({idUser: user._id, _id: idGroup}) as Group;
    }

    /**
     * @description Fetches all groups from the storage
     * @returns {Promise<Group>}
     */
    async find(user, groupId): Promise<Group> {
        return await GroupRepository.findOne({idUser: user._id, _id: groupId}) as Group;
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
}

export default new GroupService();
