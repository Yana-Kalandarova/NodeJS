import jwt from 'jsonwebtoken';
import { InvalidTokenError, UnauthorizedError } from '../exceptions';
import { config } from '../config';

export const authRequired = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        try {
            jwt.verify(token, config.authJwtSecretKey);
            next();
        } catch (error) {
            throw new InvalidTokenError('invalid token');
        }
    } else {
        throw new UnauthorizedError('authorization is required');
    }
};
