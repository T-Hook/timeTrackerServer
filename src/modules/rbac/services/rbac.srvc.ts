import { Rbac } from '../models/rbac';
import RbacRepository from '../schemas/rbac.schema';
import * as _ from 'lodash';
import { Permission } from '../models/permission';
import PermissionRepository from '../schemas/permission.schema';

/**
 * @class RbacService
 */
class RbacService {


    /**
     * @description Saves the rbac in the storage
     * @param {Rbac} rbac
     * @returns {Promise<Rbac>}
     */
    async save(rbac: Rbac): Promise<Rbac> {
        return (await new RbacRepository(rbac).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all rbacs from the storage
     * @returns {Promise<Rbac[]>}
     */
    async findAll(user): Promise<Rbac[]> {
        return await RbacRepository.find({}).populate(
            {
                path: 'permissions',
                model: 'Permission',
                populate: {
                    path: 'routes',
                    model: 'Route'
                }
            }) as Rbac[];
    }

    async getRules(): Promise<Rbac[]> {
        const result = await RbacRepository.find({}).populate(
            {
                path: 'permissions',
                model: 'Permission',
                populate: {
                    path: 'routes',
                    model: 'Route'
                }
            }) as Rbac[];
        const ACL = [];
        for (let i = 0; i < result.length; i++) {
            const acl = {
                'group': result[i].group,
                'permissions': [],
                'action': 'allow',
                'name': result[i].name,
                'description': result[i].description,
                // @ts-ignore
                '_id': result[i]._id
            };
            const permissions = [];
            for (let j = 0; j < result[i].permissions.length; j++) {
                for (let c = 0; c < result[i].permissions[j].routes.length; c++) {
                    const route = result[i].permissions[j].routes[c];
                    let indexPermission;
                    const permissionFound = _.result(_.find(permissions, function (obj, index) {
                        if (obj.resource === route.url) {
                            indexPermission = index;
                        }
                        return obj.resource === route.url;
                    }), 'resource');
                    if (permissionFound) {
                        permissions[indexPermission].methods.push(route.method);
                    } else {
                        permissions.push({
                            resource: route.url,
                            methods: [route.method],
                            action: 'allow',
                            'name': route.name,
                            'description': route.description,
                            // @ts-ignore
                            '_id': route._id
                        });
                    }
                }
            }
            permissions.push({
                'resource': '*',
                'methods': ['OPTIONS'],
                'action': 'allow'
            });
            acl.permissions = permissions;
            ACL.push(acl);
        }
        ACL.push(
            {
                'group': 'superuser',
                'permissions': [
                    {
                        'resource': '*',
                        'methods': ['POST', 'OPTIONS', 'GET', 'PUT', 'DELETE'],
                        'action': 'allow'
                    }
                ]
            });
        return ACL;
    }

    async findById(id): Promise<Rbac> {
        return await RbacRepository.findById(id) as Rbac;
    }

    updatePermission(id, permissions) {
        return RbacRepository.findByIdAndUpdate(id, {permissions: permissions});
    }

}

export default new RbacService();
