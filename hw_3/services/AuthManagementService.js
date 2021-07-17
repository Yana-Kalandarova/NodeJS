import jwt from 'jsonwebtoken';
import { UserManagementService } from './UserManagementService';
import { NotFoundError } from '../exceptions';
import { config } from '../config';

// TODO: create access and refresh tokens
// https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc
export class AuthManagementService {
    authenticate = async ({ login, password }, daoType) => {
        const userManagementService = new UserManagementService(daoType);
        const user = await userManagementService.getUserByName(login);

        if (!user || user.password !== password) {
            throw new NotFoundError('user is not found');
        } else {
            return jwt.sign({ login }, config.authJwtSecretKey, {
                expiresIn: '5m'
            });
        }
    };
}
