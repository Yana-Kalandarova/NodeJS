import jwt from 'jsonwebtoken';
import { InvalidTokenError, UnauthorizedError } from '../exceptions';

export const authRequired = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error) => {
            if (error) {
                throw new InvalidTokenError('invalid token');
            } else {
                next();
            }
        });
    } else {
        throw new UnauthorizedError('authorization is required');
    }
};
