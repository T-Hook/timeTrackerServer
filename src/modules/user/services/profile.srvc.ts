import { Profile } from '../models/profile';
import * as bcrypt from 'bcryptjs';
import ProfileRepository, { ProfileType } from '../schemas/profile.schema';

/**
 * @class ProfileService
 */
class ProfileService {

    /**
     * @description Fetches single profile from the storage by fname
     * @param fname
     * @returns {Promise<Profile>}
     */
    async findByFName(fname): Promise<Profile> {
        const profile: ProfileType = await ProfileRepository.findOne({fname: fname});
        return profile;
    }
    /**
     * @description Fetches single profile from the storage by fname
     * @param fname
     * @returns {Promise<Profile>}
     */
    async findById(id): Promise<Profile> {
        const profile: ProfileType = await ProfileRepository.findOne({_id: id});
        return profile;
    }
    /**
     * @description Saves the profile in the storage
     * @param {Profile} profile
     * @returns {Promise<Profile>}
     */
    async save(profile: Profile): Promise<Profile> {
        return (await new ProfileRepository(profile).save()).toObject({virtuals: true});
    }
    /**
     * @description Fetches all profiles from the storage
     * @returns {Promise<Profile[]>}
     */
    async findAll(): Promise<Profile[]> {
        return await ProfileRepository.find() as Profile[];
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
}

export default new ProfileService();
