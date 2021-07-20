jest.mock('../models');
jest.mock('../services');
jest.mock('../data-access');

import { mockRequest, mockResponse, mockNext } from '../utils';
import { NotFoundError } from '../exceptions';
import { fakeUser, fakeUserId, fakeUserInfo } from '../mocks';
import { usersControllers } from './index';

describe('Test usersControllers methods:', () => {
    const wrongUserId = 123;
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = mockRequest();
        res = mockResponse();
        next = mockNext;
    });

    describe('getUserById:', () => {
        test('should return User if user exists', async () => {
            req.params.id = fakeUserId;

            await usersControllers.getUserById(req, res, next);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeUser);
        });

        test('should throw NotFoundError if user does not exist', async () => {
            const error = new NotFoundError(
                'could not get user by specified id'
            );

            req.params.id = wrongUserId;

            await usersControllers.getUserById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getUsers:', () => {
        test('should return users list if users exist', async () => {
            await usersControllers.getUsers(req, res, next);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([fakeUser]);
        });
    });

    describe('addUser:', () => {
        test('should return 201 and User if user has been created', async () => {
            req.body = fakeUserInfo;

            await usersControllers.addUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeUser);
        });
    });

    describe('updateUserById:', () => {
        test('should return 204 if user exists and updated', async () => {
            req.params.id = fakeUserId;
            req.body = fakeUserInfo;

            await usersControllers.updateUserById(req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        test('should throw NotFoundError if user does not exist', async () => {
            const error = new NotFoundError(
                'could not update user by specified id'
            );

            req.params.id = wrongUserId;
            req.body = fakeUserInfo;

            await usersControllers.updateUserById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUserById:', () => {
        test('should return 200 if user has been deleted', async () => {
            req.params.id = fakeUserId;

            await usersControllers.deleteUserById(req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(200);
        });

        test('should throw NotFoundError if user does not exist', async () => {
            const error = new NotFoundError(
                'could not delete user by specified id'
            );

            req.params.id = wrongUserId;

            await usersControllers.deleteUserById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
