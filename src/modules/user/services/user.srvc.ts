import { User } from '../models/user';
import * as bcrypt from 'bcryptjs';
import UserRepository, { UserType } from '../schemas/user.schema';
import * as mongoose from 'mongoose';

/**
 * @class UserService
 */
class UserService {
    /**
     * @description Fetches single user from the storage by email
     * @param email
     * @returns {Promise<User>}
     */
    async findByEmail(email): Promise<User> {
        const user: UserType = await UserRepository.findOne({email: email})
            .populate('companyId');
        return user;
    }

    /**
     * @description Fetches single user from the storage by email
     * @param email
     * @returns {Promise<User>}
     */
    async findByEmailAndCompany(email, company): Promise<User> {
        const user: UserType = await UserRepository.findOne({email: email});
        // .populate('companyId');
        user.companyId = company;
        return user;
    }

    async updatePassword(password, token): Promise<User> {
        const user: User = await UserRepository.findOneAndUpdate({resetPasswordToken: token}, {password: password},
            {new: false});
        return user;
    }

    /**
     * @param email
     */
    async findByEmailAndResetPassword(email, token): Promise<User> {
        const user: UserType = await UserRepository.findOne({email: email, resetPasswordToken: token});
        return user;
    }


    /**
     * @description Fetches single user from the storage by email
     * @param email
     * @returns {Promise<User>}
     */
    async findById(userId): Promise<User> {
        const user: UserType = await UserRepository.findOne({_id: userId});
        return user;
    }
     async findOneById(idUser): Promise<User> {
        return await UserRepository.findOne({ _id: idUser}) as User;
    }
    async deleteOneById(id: string): Promise<void> {
        return await UserRepository.deleteOne({_id: id});
    }
    async findOneByIdAndOwnerId(idUser): Promise<User[]> {
        return await UserRepository.find({idUser: idUser}) as User[];
    }
    /**
     * @description Fetches single user from the storage by email or username
     * @param username
     * @param email
     * @returns {Promise<User>}
     */
    async findByUsernameOrEmail(username, email): Promise<User> {
        const user: User = await UserRepository.findOne({$or: [{email: email}, {username: username}]});
        return user;
    }


    /**
     * @description Saves the user in the storage
     * @param {User} user
     * @returns {Promise<User>}
     */
    async save(user: User): Promise<User> {
        return (await new UserRepository(user).save()).toObject({virtuals: true});
    }

    async updateUser(id, user): Promise<User> {
        return await UserRepository.update({_id: id}, user) as User;
    }
    /**
     * Update User
     * @param {User} user
     * @returns {Promise<User>}
     */
    update(user: User) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return (err);
            }
            bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
                if (err) {
                    return (err);
                }
                user.password = hash;
                return UserRepository.updateOne({email: user.email}, user, {});
            });
        });
    }

    async update2(user: User): Promise<User> {
        return await UserRepository.updateOne({email: user.email}, user, {});
    }

    /**
     * @description Saves the user in the storage
     * @param {User} user
     * @returns {Promise<User>}
     */
    async saveUser(user): Promise<User> {
        return (await new UserRepository(user).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches single user by activationToken and sets active flag
     * @param activationToken
     * @returns {Promise<User>}
     */
    async findOneAndUpdate(activationToken): Promise<User> {
        const user: User = await UserRepository.findOneAndUpdate({activationToken: activationToken}, {active: true}, {new: true});
        return user;
    }

    /**
     * @param email
     * @param resetToken
     */
    async findOneAndUpdateResetToken(email, resetToken): Promise<User> {
        const user: User = await UserRepository.findOneAndUpdate({email: email},
            {resetPasswordToken: resetToken}, {new: false});
        return user;
    }

    async findOneAndUpdateCompanyId(idUser, companyId): Promise<User> {
        const user: User = await UserRepository.findOneAndUpdate({_id: idUser},
            {companyId: companyId}, {new: true});
        return user;
    }

    /**
     * @description Fetches all users from the storage
     * @returns {Promise<User[]>}
     */
    async findAll(): Promise<User[]> {
        return await UserRepository.find().populate('profile') as User[];
    }
    async findone(userId): Promise<User[]> {
        return await UserRepository.find({idUser : userId}).populate('profile') as User[];
    }

    /**
     * @description Deletes a single user from storage
     * @returns {Promise<void>}
     */
    async deleteOne(username: string): Promise<void> {
        return await UserRepository.deleteOne({username: username});
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
    async findBySpecificAccessAndUserId(userId, access): Promise<User[]> {
        return await UserRepository.find({
            idUser: userId,
            acl: {$all: access}
        }).populate({path: 'idUser', model: 'User'}) as User[];
    }
    async findOneByIdAndOwner(_id): Promise<User[]> {
        return await UserRepository.find({_id: _id}) as User[];
    }
}

export default new UserService();
