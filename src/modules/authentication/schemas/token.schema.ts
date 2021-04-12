import * as mongoose from 'mongoose';
import { Token } from '../models/token';

export type TokenType = Token & mongoose.Document;

const TokenSchema = new mongoose.Schema({
    accessToken: {type: String, empty: false, required: true},
    kind: {type: String, empty: false, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

TokenSchema.pre('save', function save(next) {
    const token = this;
    next();
});



const TokenRepository = mongoose.model<TokenType>('Token', TokenSchema);
export default TokenRepository;