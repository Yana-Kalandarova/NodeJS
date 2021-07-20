jest.mock('../models');
jest.mock('../services');
jest.mock('../data-access');

import { mockRequest, mockResponse, mockNext } from '../utils';
import { NotFoundError } from '../exceptions';
import { fakeGroup, fakeGroupId, fakeGroupInfo } from '../mocks';
import { groupsControllers } from './index';

describe('Test groupsControllers methods:', () => {
    const wrongGroupId = 456;
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();

        req = mockRequest();
        res = mockResponse();
        next = mockNext();
    });

    describe('getGroupById:', () => {
        test('should return Group if group exists', async () => {
            req.params.id = fakeGroupId;

            await groupsControllers.getGroupById(req, res, next);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeGroup);
        });

        test('should throw NotFoundError if group does not exist', async () => {
            const error = new NotFoundError(
                'could not get group by specified id'
            );

            req.params.id = wrongGroupId;

            await groupsControllers.getGroupById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getGroups:', () => {
        test('should return groups list if groups exist', async () => {
            await groupsControllers.getGroups(req, res, next);

            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith([fakeGroup]);
        });
    });

    describe('addGroup:', () => {
        test('should return 201 and Group if group has been created', async () => {
            req.body = fakeGroupInfo;

            await groupsControllers.addGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledTimes(1);
            expect(res.json).toHaveBeenCalledWith(fakeGroup);
        });
    });

    describe('updateGroupById:', () => {
        test('should return 204 if group exists and updated', async () => {
            req.params.id = fakeGroupId;
            req.body = fakeGroupInfo;

            await groupsControllers.updateGroupById(req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(204);
        });

        test('should throw NotFoundError if group does not exist', async () => {
            const error = new NotFoundError(
                'could not update group by specified id'
            );

            req.params.id = wrongGroupId;
            req.body = fakeGroupInfo;

            await groupsControllers.updateGroupById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteGroupById:', () => {
        test('should return 200 if group has been deleted', async () => {
            req.params.id = fakeGroupId;

            await groupsControllers.deleteGroupById(req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(200);
        });

        test('should throw NotFoundError if group does not exist', async () => {
            const error = new NotFoundError(
                'could not delete group by specified id'
            );

            req.params.id = wrongGroupId;

            await groupsControllers.deleteGroupById(req, res, next);

            expect(next).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('addUsersToGroup:', () => {
        test('should return 200 if users have been added to group', async () => {
            req.body = {
                groupId: fakeGroupId,
                userIds: [1, 2, 3]
            };

            await groupsControllers.addUsersToGroup(req, res, next);

            expect(res.sendStatus).toHaveBeenCalledWith(200);
        });
    });
});
