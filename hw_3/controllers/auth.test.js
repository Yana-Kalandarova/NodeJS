jest.mock('../models');
jest.mock('../services');
jest.mock('../data-access');

import { mockRequest, mockResponse, mockNext } from '../utils';
import { ValidationError } from '../exceptions';
import { fakeJwtToken, fakeUserLogin, fakeUserPassword } from '../mocks';
import { authControllers } from './index';

describe('Test authControllers methods:', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = mockRequest();
        res = mockResponse();
        next = mockNext();
    });

    describe('authenticateUser:', () => {
        test('should return 200 and Token if token has been generated', async () => {
            req.body = {
                login: fakeUserLogin,
                password: fakeUserPassword
            };

            await authControllers.authenticateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith({ token: fakeJwtToken });
        });

        test('should throw ValidationError if login param is missed', async () => {
            const error = new ValidationError(
                'login and password are required'
            );

            req.body = {
                password: fakeUserPassword
            };

            await authControllers.authenticateUser(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });

        test('should throw ValidationError if password param is missed', async () => {
            const error = new ValidationError(
                'login and password are required'
            );

            req.body = {
                login: fakeUserLogin
            };

            await authControllers.authenticateUser(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });

        test('should throw ValidationError if both login and password param is missed', async () => {
            const error = new ValidationError(
                'login and password are required'
            );

            await authControllers.authenticateUser(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
