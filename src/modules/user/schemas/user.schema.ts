import * as mongoose from 'mongoose';
import { Profile } from '../models/profile';
import * as bcrypt from 'bcryptjs';
import { User } from '../models/user';
import { CompanyUser } from '../../company/models/companyUser';
import { ProjectUser } from '../../project/models/projectUser';
export type UserType = User & mongoose.Document;

const UserSchema = new mongoose.Schema({
    email: {type: String, index: {unique: true}},
    fname: String,
    lname: String,
    username: String,
    password: String,
    position: String,
    speciality: String,
    role: String,
    companyId: String,
    companyUser: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanyUser'},
    projectUser: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'},
    active: Boolean,
    passwordResetToken: String,
    passwordResetExpires: Date,
    activationToken: String,
    resetPasswordToken: String,
    activationExpires: Date
}, {timestamps: true});

/**
 * Password hash middleware.
 */
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
/**
 * Password hash middleware.
 */
UserSchema.pre('updatesssOne', function save(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
/**
 * Password hash middleware.
 */
UserSchema.pre('findAll', function save(next) {
    next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
    return bcrypt.compareSync(candidatePassword, this.password);
};


const UserRepository = mongoose.model<UserType>('User', UserSchema);
export default UserRepository;
