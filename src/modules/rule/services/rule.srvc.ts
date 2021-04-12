import { Rule } from '../models/rule';
import * as bcrypt from 'bcryptjs';
import RuleRepository from '../schemas/rule.schema';

/**
 * @class RuleService
 */
class RuleService {


    /**
     * @description Saves the rule in the storage
     * @param {Rule} rule
     * @returns {Promise<Rule>}
     */
    async save(rule: Rule): Promise<Rule> {
        return (await new RuleRepository(rule).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches all rules from the storage
     * @returns {Promise<Rule[]>}
     */
    async findAll(): Promise<Rule[]> {
        return await RuleRepository.find({}).populate(
            {
                path: 'idCompany',
                model: 'Company'
            })  as Rule[];
    }

    async updateRule(id , rule): Promise<Rule> {
        return await RuleRepository.update({_id: id}, rule) as Rule;
    }

    /**
     * @param id
     */
    async findOneById(id): Promise<Rule> {
        return await RuleRepository.findOne({_id: id}) as Rule;
    }

    /**
     * @param user
     * @param idRule
     * @returns {Promise<Rule[]>}
     */
    async findOneByIdAndOwnerId(user, idRule): Promise<Rule> {
        return await RuleRepository.findOne({idUser: user._id, _id: idRule}) as Rule;
    }

    /**
     * @description Fetches all rules from the storage
     * @returns {Promise<Rule>}
     */
    async find(user, ruleId): Promise<Rule> {
        return await RuleRepository.findOne({idUser: user._id, _id: ruleId}) as Rule;
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

    /**
     * @description Deletes a Rule
     * @returns {Promise<void>}
     */
    async deleteOneById(id: string): Promise<void> {
        return await RuleRepository.deleteOne({_id: id});
    }
}


export default new RuleService();
