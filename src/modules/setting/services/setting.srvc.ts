import { Setting } from '../models/setting';
import SettingRepository from '../schemas/setting.schema';

/**
 * @class SettingService
 */
class SettingService {


    /**
     * @description Saves the setting in the storage
     * @param {Setting} setting
     * @returns {Promise<Setting>}
     */
    async save(setting: Setting): Promise<Setting> {
        return (await new SettingRepository(setting).save()).toObject({virtuals: true});
    }



    /**
     * @description Fetches all settings from the storage
     * @returns {Promise<Setting[]>}
     */
    async findAll(): Promise<Setting[]> {
        return await SettingRepository.find({}) as Setting[];
    }

    /**
     * @param user
     * @param idSetting
     * @returns {Promise<Setting[]>}
     */
    async findOneByIdAndOwnerId(user, idSetting): Promise<Setting> {
        return await SettingRepository.findOne({idUser: user._id, _id: idSetting}) as Setting;
    }

    /**
     * @param user
     * @param idSetting
     */
    async findOneById( idSetting): Promise<Setting> {
        return await SettingRepository.findOne({ _id: idSetting}) as Setting;
    }

    /**
     * @description Fetches all settings from the storage
     * @returns {Promise<Setting>}
     */
    async find(user, settingId): Promise<Setting> {
        return await SettingRepository.findOne({idUser: user._id, _id: settingId}) as Setting;
    }

}

export default new SettingService();
