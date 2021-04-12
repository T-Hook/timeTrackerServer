import { Token } from '../../authentication/models/token';
import { Profile } from './profile';
import { CompanyUser } from '../../company/models/companyUser';
import { ProjectUser } from '../../project/models/projectUser';

export interface User {
    email?: string;
    username?: string;
    password?: string;
    position?: string;
    speciality?: string;
    role?: string;
    active?: boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    activationToken?: string;
    resetPasswordToken?: string;
    activationExpires?: Date;
    companyId?: string;
    companyUser?: CompanyUser;
    projectUser?: ProjectUser;
    tokens?: Array<Token>;
    profile?: Profile;
}


export class UserEntity implements User {
    email?: string;
    username?: string;
    password?: string;
    role?: string;
    active?: boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    activationToken?: string;
    activationExpires?: Date;
    tokens?: Array<Token>;
    profile?: Profile;

}
