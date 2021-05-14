import { Mail } from '../models/mail';
import MailRepository from '../schemas/mail.schema';

/**
 * @class MailService
 */
class MailService {


    /**
     * @description Saves the mail in the storage
     * @param {mail}
     * @returns {Promise<Mail>}
     */
    async save(mail: Mail): Promise<Mail> {
        return (await new MailRepository(mail).save()).toObject({virtuals: true});
    }



    /**
     * @description Fetches all mails from the storage
     * @returns {Promise<Mail[]>}
     */
    async findAll(): Promise<Mail[]> {
        return await MailRepository.find({}).populate(
            {
                path: 'idS',
                model: 'User',
            })
           .populate({
                            path: 'idR',
                            model: 'User',
                        }) as Mail[];
    }
    async findone(userId): Promise<Mail[]> {
        return await MailRepository.find({idR: userId}).populate(
            {
                path: 'idS',
                model: 'User',
            })
           .populate({
                            path: 'idR',
                            model: 'User',
                        }) as Mail[];
    }
    async find1withsenderandreceiver(idR, idS): Promise<Mail[]> {
        return await MailRepository.find({idR: idR, idS: idS}).populate(
            {
                path: 'idS',
                model: 'User',
            })
           .populate({
                            path: 'idR',
                            model: 'User',
                        }) as Mail[];
    }
    async find2withsenderandreceiver(idS, idR): Promise<Mail[]> {
        return await MailRepository.find({ idS: idS, idR: idR}).populate(
            {
                path: 'idS',
                model: 'User',
            })
           .populate({
                            path: 'idR',
                            model: 'User',
                        }) as Mail[];
    }
    async deleteOneById(id: string): Promise<void> {
        return await MailRepository.deleteOne({_id: id});
    }
    /**
     * @param user
     * @param idMail
     * @returns {Promise<Mail[]>}
     */
    async findOneByIdAndOwnerId(user): Promise<Mail[]> {
        return await MailRepository.find({idS: user._id}) as Mail[];
    }
    /**
     * @param user
     * @param idMail
     */
    async findOneById(idMail): Promise<Mail> {
        return await MailRepository.findOne({ _id: idMail}) as Mail;
    }

    /**
     * @description Fetches all mails from the storage
     * @returns {Promise<Mails>}
     */
    async find(user, mailId): Promise<Mail> {
        return await MailRepository.findOne({idS: user._id, _id: mailId}) as Mail;
    }

}

export default new MailService();
