import { Company } from '../models/company';
import CompanyRepository from '../schemas/company.schema';
import GroupUserRepository from '../../group/schemas/groupUser.schema';
import CompanyUserRepository from '../schemas/companyUser.schema';
import { CompanyUser } from '../models/companyUser';
import GroupProjectRepository from '../../group/schemas/groupProject.schema';

/**
 * @class CompanyService
 */
class CompanyService {


    /**
     * @description Saves the company in the storage
     * @param {Company} company
     * @returns {Promise<Company>}
     */
    async save(company: Company): Promise<Company> {
        return (await new CompanyRepository(company).save()).toObject({virtuals: true});
    }

    /**
     * @description Saves the company in the storage
     * @param {Company} company
     * @returns {Promise<Company>}
     */
    async update(company: Company): Promise<Company> {
        return await CompanyRepository.updateOne({
                // @ts-ignore
                _id: company._id
            },
            company
            , {});
    }
    async updatec(id , company): Promise<Company> {
        return await CompanyRepository.update({_id: id}, company) as Company;
    }
    async deleteOneById(id: string): Promise<void> {
        return await CompanyRepository.deleteOne({_id: id});
    }

    /**
     * @description Fetches all companies from the storage
     * @returns {Promise<Company[]>}
     */
    async findAll(): Promise<Company[]> {
        return await CompanyRepository.find({}) as Company[];
    }

    /**
     * @param user
     * @param idCompany
     * @returns {Promise<Company[]>}
     */
    async findOneByIdAndOwnerId(user, idCompany): Promise<Company> {
        return await CompanyRepository.findOne({idUser: user._id, _id: idCompany}) as Company;
    }

    /**
     * @param user
     * @param idCompany
     */
    async findOneById(idCompany): Promise<Company> {
        return await CompanyRepository.findOne({_id: idCompany}) as Company;
    }

    /**
     * @description Fetches all companies from the storage
     * @returns {Promise<Company>}
     */
    async find(user, companyId): Promise<Company> {
        return await CompanyRepository.findOne({idUser: user._id, _id: companyId}) as Company;
    }

    async findUserRoleInCompany(idCompany): Promise<CompanyUser[]> {
        return await CompanyUserRepository.find({idCompany: idCompany}).populate(
            {
                path: 'idUser',
                model: 'User',
                populate: {
                    path: 'profile',
                    model: 'Profile'
                }
            }) as CompanyUser[];
    }

    async findSharedProjectWithUserInCompany(idCompany, idUser): Promise<CompanyUser[]> {
        const listGroup = [];
        const ss = await GroupUserRepository.find({companyId: idCompany, idUser: idUser});
        for (let y = 0; y < ss.length; y++) {

            const sss = await GroupProjectRepository.find({idGroup: ss[y].idGroup})
                .populate('idProject');
            // if (sss.length) {
            //     listGroup.push(sss);
            // }
            const Group = {
                group: ss[y],
                projects: sss
            };
            listGroup.push(Group);
        }
        return listGroup;
    }

}

export default new CompanyService();
