import jwt from 'jsonwebtoken';
import { UserManagementService } from './UserManagementService';
import { NotFoundError } from '../exceptions';

export class AuthManagementService {
    authenticate = async ({ login, password }, daoType) => {
        const userManagementService = new UserManagementService(daoType);
        const user = await userManagementService.getUserByName(login);

        if (!user || user.password !== password) {
            throw new NotFoundError('user is not found');
        } else {
            return jwt.sign({ login }, process.env.JWT_SECRET_KEY, {
                expiresIn: '5m'
            });
        }
    };
}
