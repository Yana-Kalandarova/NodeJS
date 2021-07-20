jest.mock('jsonwebtoken');
jest.mock('../models');
jest.mock('../services');
jest.mock('../data-access');

import jwt from 'jsonwebtoken';
import { fakeJwtToken, fakeUserLogin, fakeUserPassword } from '../mocks';
import { NotFoundError } from '../exceptions';
import { AuthManagementService } from './AuthManagementService';
import { UserDAO } from '../data-access';
import { UserModel } from '../models';

describe('Test AuthManagementService methods:', () => {
    const userDAO = new UserDAO(UserModel);
    const serviceInstance = new AuthManagementService(userDAO);
    const wrongUserLogin = 'wrongUserLogin';
    const wrongUserPassword = 'wrongUserPassword';

    jwt.sign = jest.fn().mockReturnValue(Promise.resolve(fakeJwtToken));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('authenticate:', () => {
        test('should return jwt token if user exists and passwords are equal', async () => {
            const result = await serviceInstance.authenticate({
                login: fakeUserLogin,
                password: fakeUserPassword
            });

            expect(jwt.sign).toHaveBeenCalledTimes(1);
            expect(result).toEqual(fakeJwtToken);
        });

        test('should return NotFoundError if user does not exist', async () => {
            try {
                await serviceInstance.authenticate({
                    login: wrongUserLogin,
                    password: fakeUserPassword
                });

                expect(jwt.sign).toHaveBeenCalledTimes(0);
            } catch (error) {
                expect(error.message).toEqual('user is not found');
                expect(error.constructor).toEqual(NotFoundError);
            }
        });

        test('should return NotFoundError if passwords are not equal', async () => {
            try {
                await serviceInstance.authenticate({
                    login: fakeUserLogin,
                    password: wrongUserPassword
                });

                expect(jwt.sign).toHaveBeenCalledTimes(0);
            } catch (error) {
                expect(error.message).toEqual('user is not found');
                expect(error.constructor).toEqual(NotFoundError);
            }
        });
    });
});
