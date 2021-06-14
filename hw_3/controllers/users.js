import { UserModel } from '../models/userModel';
import { UserManagementService } from '../services';
import { getUserIdFromRequest } from '../utils/users';
import { UserDAO } from '../data-access';

const userDAO = new UserDAO(UserModel);
const userManagementService = new UserManagementService(userDAO);

export const getUserById = async (req, res) => {
    const id = getUserIdFromRequest(req);

    try {
        const user = await userManagementService.getUserById(id);

        if (user) {
            res.json(user);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const getUsers = async (req, res) => {
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
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const addUser = async (req, res) => {
    const userInfo = req.body;

    try {
        const user = await userManagementService.createUser(userInfo);

        res.status(201).json(user);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const updateUserById = async (req, res) => {
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
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};

export const deleteUserById = async (req, res) => {
    const id = getUserIdFromRequest(req);

    try {
        const isDeleted = await userManagementService.deleteUserById(id);

        if (isDeleted) {
            res.sendStatus(200);
        } else {
            throw new Error();
        }
    } catch (error) {
        res.sendStatus(404);
    }
};
