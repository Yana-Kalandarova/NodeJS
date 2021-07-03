import { UserModel } from '../models';
import { UserManagementService } from '../services';
import { getIdFromRequest as getUserIdFromRequest } from '../utils/common';
import { UserDAO } from '../data-access';
import { NotFoundError } from '../exceptions';

const userDAO = new UserDAO(UserModel);
const userManagementService = new UserManagementService(userDAO);

export const getUserById = async (req, res, next) => {
    const id = getUserIdFromRequest(req);

    try {
        const user = await userManagementService.getUserById(id);

        if (user) {
            res.json(user);
        } else {
            throw new NotFoundError('could not get user by specified id');
        }
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    const {
        query: { login, limit }
    } = req;

    try {
        const resultsUsersList = await userManagementService.findUsersByQuery(
            login,
            limit
        );

        if (resultsUsersList.length) {
            res.json(resultsUsersList);
        } else {
            throw new NotFoundError('could not get users by specified params');
        }
    } catch (error) {
        next(error);
    }
};

export const addUser = async (req, res, next) => {
    const userInfo = req.body;

    try {
        const user = await userManagementService.createUser(userInfo);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUserById = async (req, res, next) => {
    const userInfo = req.body;
    const id = getUserIdFromRequest(req);

    try {
        const [isUpdated] = await userManagementService.updateUserById(
            id,
            userInfo
        );

        if (isUpdated) {
            res.sendStatus(204);
        } else {
            throw new NotFoundError('could not update user by specified id');
        }
    } catch (error) {
        next(error);
    }
};

export const deleteUserById = async (req, res, next) => {
    const id = getUserIdFromRequest(req);

    try {
        const isDeleted = await userManagementService.deleteUserById(id);

        if (isDeleted) {
            res.sendStatus(200);
        } else {
            throw new NotFoundError('could not delete user by specified id');
        }
    } catch (error) {
        next(error);
    }
};
