import { UserModel } from '../models';
import { AuthManagementService } from '../services';
import { UserDAO } from '../data-access';
import { InvalidTokenError, ValidationError } from '../exceptions';

const userDAO = new UserDAO(UserModel);
const authManagementService = new AuthManagementService();

export const authenticateUser = async (req, res, next) => {
    const { login, password } = req.body;

    try {
        if (!login || !password) {
            throw new ValidationError('login and password are required');
        }

        const token = await authManagementService.authenticate(
            {
                login,
                password
            },
            userDAO
        );

        if (token) {
            res.status(200).json({ token });
        } else {
            throw new InvalidTokenError('fail to authenticate user');
        }
    } catch (error) {
        next(error);
    }
};
