import { Project } from '../models/project';
import * as bcrypt from 'bcryptjs';
import ProjectRepository, { ProjectType } from '../schemas/project.schema';
import { ProjectUser } from '../models/projectUser';
import ProjectUserRepository from '../schemas/projectUser.schema';


/**
 * @class ProjectService
 */
class ProjectService {


    /**
     * @description Saves the project in the storage
     * @param {Project} project
     * @returns {Promise<Project>}
     */
    async save(project: Project): Promise<Project> {
        return (await new ProjectRepository(project).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches single project from the storage by id project
     * @returns {Promise<Project>}
     */
    async findById(projectId): Promise<Project> {
        const project: ProjectType = await ProjectRepository.findOne({_id: projectId});
        return project;
    }

    /**
     * @description Fetches single project from the storage by id project
     * @returns {Promise<Project>}
     */
    async findCompanyInProject(projectId): Promise<Project> {
        const project: ProjectType = await ProjectRepository.findOne({_id: projectId});
        return project;
    }

    /**
     * @description Fetches all projects from the storage
     * @returns {Promise<Project[]>}
     */
    async findAll(): Promise<Project[]> {
        return await ProjectRepository.find({}).populate(
            {
                path: 'idCompany',
                model: 'Company'
            }) as Project[];
    }

    /**
     * @description Fetches all projects from the storage
     * @returns {Promise<Project[]>}
     */
    async findAllInCompany(idCompany): Promise<Project[]> {
        return await ProjectRepository.find({idCompany: idCompany}) as Project[];
    }

    /**
     * @param user
     * @param idProject
     * @returns {Promise<Project[]>}
     */
    async findOneByIdAndOwnerId(user, idProject): Promise<Project> {
        return await ProjectRepository.findOne({idUser: user._id, _id: idProject}) as Project;
    }

    /**
     * @description Fetches all projects from the storage
     * @returns {Promise<Project>}
     */
    async find(user, projectId): Promise<Project> {
        return await ProjectRepository.findOne({idUser: user._id, _id: projectId}) as Project;
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

    async update(id , project): Promise<Project> {
        return await ProjectRepository.update({_id: id}, project) as Project;
    }
    async deleteOneById(id: string): Promise<void> {
        return await ProjectRepository.deleteOne({_id: id});
    }
      /** * @param Project / *** @param idProject */
       async findOneById(idProject): Promise<Project> {
        return await ProjectRepository.findOne({_id: idProject}) as Project;
    }

    async findUserRoleInProject(idProject): Promise<ProjectUser[]> {
        return await ProjectUserRepository.find({idCompany: idProject}).populate(
            {
                path: 'idUser',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            }) as ProjectUser[];
    }


}

export default new ProjectService();
