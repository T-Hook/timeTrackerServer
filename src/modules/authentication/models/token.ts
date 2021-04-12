import { User } from '../../user/models/user';

export type Token = {
    accessToken: string,
    kind: string,
    user: User;
};