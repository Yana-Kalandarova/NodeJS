import { GroupModel } from '../models';
import { GroupManagementService } from '../services';
import { getIdFromRequest as getGroupIdFromRequest } from '../utils/common';
import { GroupDAO } from '../data-access';
import { NotFoundError } from '../exceptions';

const groupDAO = new GroupDAO(GroupModel);
const groupManagementService = new GroupManagementService(groupDAO);

export const getGroupById = async (req, res, next) => {
    const id = getGroupIdFromRequest(req);

    try {
        const group = await groupManagementService.getGroupById(id);

        if (group) {
            res.json(group);
        } else {
            throw new NotFoundError('could not get group by specified id');
        }
    } catch (error) {
        next(error);
    }
};

export const getGroups = async (req, res) => {
    try {
        const groupsList = await groupManagementService.getAllGroups();

        if (groupsList.length) {
            res.json(groupsList);
        } else {
            throw new NotFoundError('could not get groups by specified params');
        }
    } catch (error) {
        next(error);
    }
};

export const addGroup = async (req, res, next) => {
    const groupInfo = req.body;

    try {
        const group = await groupManagementService.createGroup(groupInfo);

        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
};

export const updateGroupById = async (req, res, next) => {
    const groupInfo = req.body;
    const id = getGroupIdFromRequest(req);

    try {
        const [isUpdated] = await groupManagementService.updateGroupById(
            id,
            groupInfo
        );

        if (isUpdated) {
            res.sendStatus(204);
        } else {
            throw new NotFoundError('could not update group by specified id');
        }
    } catch (error) {
        next(error);
    }
};

export const deleteGroupById = async (req, res, next) => {
    const id = getGroupIdFromRequest(req);

    try {
        const isDeleted = await groupManagementService.deleteGroupById(id);

        if (isDeleted) {
            res.sendStatus(200);
        } else {
            throw new NotFoundError('could not delete group by specified id');
        }
    } catch (error) {
        next(error);
    }
};

export const addUsersToGroup = async (req, res, next) => {
    const {
        body: { groupId, userIds }
    } = req;

    try {
        const result = await groupManagementService.addUsersToGroup(
            groupId,
            userIds
        );

        if (result) {
            res.sendStatus(200);
        } else {
            throw new NotFoundError('could not add users to specified groups');
        }
    } catch (error) {
        next(error);
    }
};
