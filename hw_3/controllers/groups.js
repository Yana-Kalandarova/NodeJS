import { GroupModel } from '../models/groupModel';
import { GroupManagementService } from '../services';
import { getIdFromRequest as getGroupIdFromRequest } from '../utils/common';
import { GroupDAO } from '../data-access';

const groupDAO = new GroupDAO(GroupModel);
const groupManagementService = new GroupManagementService(groupDAO);

export const getGroupById = async (req, res) => {
    const id = getGroupIdFromRequest(req);

    try {
        const group = await groupManagementService.getGroupById(id);

        if (group) {
            res.json(group);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const getGroups = async (req, res) => {
    try {
        const groupsList = await groupManagementService.getAllGroups();

        if (groupsList.length) {
            res.json(groupsList);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const addGroup = async (req, res) => {
    const groupInfo = req.body;

    try {
        const group = await groupManagementService.createGroup(groupInfo);

        res.status(201).json(group);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const updateGroupById = async (req, res) => {
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
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const deleteGroupById = async (req, res) => {
    const id = getGroupIdFromRequest(req);

    try {
        const isDeleted = await groupManagementService.deleteGroupById(id);

        if (isDeleted) {
            res.sendStatus(200);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};
