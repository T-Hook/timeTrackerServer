import { ProjectUser } from '../models/projectUser';
import { Project } from '../models/project';
import ProjectUserRepository, { ProjectUserType } from '../schemas/projectUser.schema';
import ProjectRepository, { ProjectType } from '../schemas/project.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';


/**
 * @class ProjectUserService
 */
class ProjectUserService {


    /**
     * @description Saves the project in the storage
     * @param {ProjectUser} ProjectUser
     * @returns {Promise<ProjectUser>}
     */
    async save(projectUser: ProjectUser): Promise<ProjectUser> {
        return (await new ProjectUserRepository(projectUser).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the project in the storage
     * @param {ProjectUser} ProjectUser
     * @returns {Promise<ProjectUser>}
     */
    async findAndUpdate(projectUser: ProjectUser): Promise<ProjectUser> {
        return await ProjectUserRepository.findOneAndUpdate({
            idProject: projectUser.idProject,
            idUser: projectUser.idUser
        }, {acl: projectUser.acl}, {new: false});
    }

    async findAllShared(userId): Promise<ProjectUser[]> {
        return await ProjectUserRepository.find({idUser: userId}).populate('Project') as ProjectUser[];
    }

    async findAllUserInSharedProject(userId, projectId): Promise<ProjectUser[]> {
        const project = await ProjectRepository.findById(projectId).populate('User') as Project;
        if (project.idUser === userId) {
            return await ProjectUserRepository.find({projectId: projectId}).populate({
                path: 'idUser',
                model: 'User',
            }) as ProjectUser[];
        } else {
            const role = await ProjectUserRepository.findOne({idUser: userId, idProject: projectId}) as ProjectUser;
            if (role) {
                const findRole = _.findIndex(role.acl, function (o) {
                    return o === 'get';
                });
                if (findRole >= 0) {
                    return await ProjectUserRepository.find({idProject: projectId}).populate({
                        path: 'idUser',
                        model: 'User',
                    }) as ProjectUser[];
                } else {
                    return [];
                }
            } else {
                return [];
            }
        }
    }

    /**
     * @description Fetches all projects from the storage
     * @returns {Promise<Project>}
     */
    async findByUserAndProject(userId, projectId): Promise<ProjectUser> {
        return await ProjectUserRepository.findOne({idUser: userId, idProject: projectId}) as ProjectUser;
    }
}

export default new ProjectUserService();