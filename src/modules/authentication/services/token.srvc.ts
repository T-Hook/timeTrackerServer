import { Token } from '../models/token';
import TokenRepository from '../schemas/token.schema';

/**
 * @class TokenService
 */
class TokenService {

    constructor() {
    }

    /**
     * @description Saves the token in the storage
     * @param {Token} token
     * @returns {Promise<Token>}
     */
    async save(token: Token): Promise<Token> {
        return (await new TokenRepository(token).save()).toObject({virtuals: true});
    }

    /**
     * @description Fetches single token by accessToken and sets active flag
     * @param accessToken
     * @returns {Promise<Token>}
     */
    async findToken(accessToken): Promise<Token> {
        const token: Token = await TokenRepository.findOne({accessToken: accessToken}).populate('user');
        return token;
    }

    /**
     * @description Fetches all tokens from the storage
     * @returns {Promise<Token[]>}
     */
    async findAll(): Promise<Token[]> {
        return await TokenRepository.find().populate('profile') as Token[];
    }

    /**
     * @description Deletes a single token from storage
     * @returns {Promise<void>}
     */
    async deleteOne(accessToken: string): Promise<void> {
        return await TokenRepository.deleteOne({accessToken: accessToken});
    }
}

export default new TokenService();
