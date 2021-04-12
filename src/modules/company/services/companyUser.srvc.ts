import { CompanyUser } from '../models/companyUser';
import { Company } from '../models/company';
import CompanyUserRepository, { CompanyUserType } from '../schemas/companyUser.schema';
import CompanyRepository, { CompanyType } from '../schemas/company.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';


/**
 * @class CompanyUserService
 */
class CompanyUserService {


    /**
     * @description Saves the company in the storage
     * @param {CompanyUser} CompanyUser
     * @returns {Promise<CompanyUser>}
     */
    async save(companyUser: CompanyUser): Promise<CompanyUser> {
        return (await new CompanyUserRepository(companyUser).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the company in the storage
     * @param {CompanyUser} CompanyUser
     * @returns {Promise<CompanyUser>}
     */
    async findAndUpdate(companyUser: CompanyUser): Promise<CompanyUser> {
        return await CompanyUserRepository.findOneAndUpdate({
            idCompany: companyUser.idCompany,
            idUser: companyUser.idUser
        }, {acl: companyUser.acl}, {new: false}).populate(
            {
                path: 'idUser',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            });
    }

    async delete(id) {
        return await CompanyUserRepository.deleteOne({
            _id: id
        });
    }

    async findByCompanyAndUserAll(userId, CompanyId): Promise<CompanyUser> {
        return await CompanyUserRepository.findOne({idUser: userId, idCompany: CompanyId}) as CompanyUser;
    }

    async findAllShared(userId): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({idUser: userId}).populate('Company') as CompanyUser[];
    }

    async findBySpecificAccessAndUserId(userId, access): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({
            idUser: userId,
            acl: {$all: access}
        }).populate({path: 'idCompany', model: 'Company'}) as CompanyUser[];
    }

    async findBySpecificAccessUserIdAndCompanyId(userId, access, companyId): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({
            idUser: userId,
            idCompany: companyId,
            acl: {$all: access}
        }).populate({path: 'idCompany', model: 'Company'}) as CompanyUser[];
    }

    async findOneBySpecificAccessUserIdAndCompanyName(userId, access, companyName): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({
            idUser: userId,
            acl: {$all: access},
        }).populate({
            path: 'idCompany',
            model: 'Company',
            match: {name: companyName}
        }) as CompanyUser[];
    }

    async findBySpecificAccessUserIdAndCompanyName(userId, access, companyName): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({
            idUser: userId,
            acl: {$all: access},
        }).populate({
            path: 'idCompany',
            model: 'Company',
            match: {name: companyName, 'idCompany': {$ne: null}}
        }) as CompanyUser[];
    }

    async findAllUserInSharedCompany(userId, companyId): Promise<CompanyUser[]> {
        const company = await CompanyRepository.findById(companyId).populate('User') as Company;
        if (company.idUser === userId) {
            return await CompanyUserRepository.find({companyId: companyId}).populate({
                path: 'idUser',
                model: 'User',
            }) as CompanyUser[];
        } else {
            const role = await CompanyUserRepository.findOne({idUser: userId, idCompany: companyId}) as CompanyUser;
            if (role) {
                const findRole = _.findIndex(role.acl, function (o) {
                    return o === 'get';
                });
                if (findRole >= 0) {
                    return await CompanyUserRepository.find({idCompany: companyId}).populate({
                        path: 'idUser',
                        model: 'User',
                    }) as CompanyUser[];
                } else {
                    return [];
                }
            } else {
                return [];
            }
        }
    }

    /**
     * @description Fetches all companys from the storage
     * @returns {Promise<Company>}
     */
    async findByUserAndCompany(userId, companyId): Promise<CompanyUser> {
        return await CompanyUserRepository.findOne({idUser: userId, idCompany: companyId}) as CompanyUser;
    }
}

export default new CompanyUserService();
