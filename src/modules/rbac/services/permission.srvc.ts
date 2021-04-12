import { Permission } from '../models/permission';
import PermissionRepository from '../schemas/permission.schema';


/**
 * @class PermissionService
 */
class PermissionService {


    /**
     * @description Saves the permission in the storage
     * @param {Permission} permission
     * @returns {Promise<Permission>}
     */
    async save(permission: Permission): Promise<Permission> {
        return (await new PermissionRepository(permission).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all permissions from the storage
     * @returns {Promise<Permission[]>}
     */
    async findAll(): Promise<Permission[]> {
        return await PermissionRepository.find({}).populate('routes') as Permission[];
    }
    /**
     * @param permission
     * @param idPermission
     */
     async findOneById(idPermission): Promise<Permission> {
        return await PermissionRepository.findOne({ _id: idPermission}) as Permission;
    }

    async findById(id): Promise<Permission> {
        return await PermissionRepository.findById(id) as Permission;
    }

    updateRoutes(id, routes) {
        return PermissionRepository.findByIdAndUpdate(id, {routes: routes});
    }
    async deleteOneById(id: string): Promise<void> {
        return await PermissionRepository.deleteOne({_id: id});
    }
}

export default new PermissionService();