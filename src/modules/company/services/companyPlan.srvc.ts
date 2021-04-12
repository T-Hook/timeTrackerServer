import { CompanyPlan } from '../models/companyPlan';
import { Company } from '../models/company';
import CompanyPlanRepository, { CompanyPlanType } from '../schemas/companyPlan.schema';
import CompanyRepository, { CompanyType } from '../schemas/company.schema';
import { Permission } from '../../rbac/models/permission';
import PermissionRepository from '../../rbac/schemas/permission.schema';
import * as _ from 'lodash';
import CompanyUserRepository from '../schemas/companyUser.schema';


/**
 * @class CompanyPlanService
 */
class CompanyPlanService {


    /**
     * @description Saves the company in the storage
     * @param {CompanyPlan} CompanyPlan
     * @returns {Promise<CompanyPlan>}
     */
    async save(companyPlan: CompanyPlan): Promise<CompanyPlan> {
        return (await new CompanyPlanRepository(companyPlan).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the company in the storage
     * @param {CompanyPlan} CompanyPlan
     * @returns {Promise<CompanyPlan>}
     */
    async findAndUpdate(companyPlan: CompanyPlan): Promise<CompanyPlan> {
        return await CompanyPlanRepository.findOneAndUpdate({
            idCompany: companyPlan.idCompany,
            idUser: companyPlan.idPlan
        }, {data: companyPlan.data}, {new: false});
    }

    async delete(id) {
        return await CompanyPlanRepository.deleteOne({
            _id: id
        });
    }

    async findAllShared(userId): Promise<CompanyPlan[]> {
        return await CompanyPlanRepository.find({idUser: userId}).populate('Company') as CompanyPlan[];
    }

    /**
     * @param companyId
     */
    async getAllPlanInCompany(companyId): Promise<CompanyPlan[]> {
        return await CompanyPlanRepository.find({idCompany: companyId})
            .populate({
                path: 'idPlan',
                model: 'Plan',
                populate: {
                    path: 'rules',
                    model: 'Rule'
                }
            }) as CompanyPlan[];
    }

    /**
     * @description Fetches all companys from the storage
     * @returns {Promise<Company>}
     */
    async findByUserAndCompany(userId, companyId): Promise<CompanyPlan> {
        return await CompanyPlanRepository.findOne({idUser: userId, idCompany: companyId}) as CompanyPlan;
    }

    /**
     * @description Fetches all companys from the storage
     * @returns {Promise<CompanyPlan>}
     */
    async findByPlanAndCompany(planId, companyId): Promise<CompanyPlan> {
        return await CompanyPlanRepository.findOne({idPlan: planId, idCompany: companyId}) as CompanyPlan;
    }
}

export default new CompanyPlanService();
