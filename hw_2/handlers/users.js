import { v4 as uuid } from 'uuid';
import { userSchema, errorResponse } from '../validation';
import { getAutoSuggestUsers } from '../utils/users';
import { VALIDATION_OPTIONS } from '../constants/validation';

const users = {};

export const findUserById = (req, res, next, id) => {
    const user = users[id];

    if (user && !user.isDeleted) {
        req.user = user;
    } else {
        res.sendStatus(404);
    }

    next();
};

export const getUserById = (req, res) => {
    const { user } = req;

    res.json(user);
};

export const getUsers = (req, res) => {
    const {
        query: { login, limit }
    } = req;
    const activeUsers = Object.values(users).filter((user) => !user.isDeleted);
    const resultsUsersList = getAutoSuggestUsers(activeUsers, limit, login);

    if (resultsUsersList.length) {
        const resultUsers = resultsUsersList.reduce((acc, curr) => {
            acc[curr.id] = curr;

            return acc;
        }, {});

        res.json(resultUsers);
    } else {
        res.sendStatus(404);
    }
};

export const addUser = (req, res) => {
    const userInfo = req.body;
    const { error } = userSchema.validate(userInfo, VALIDATION_OPTIONS);

    if (error) {
        res.status(400).json(errorResponse(error.details));
    } else {
        const id = uuid();
        const user = {
            ...userInfo,
            id,
            isDeleted: false
        };

        users[id] = user;

        res.status(201).json(user);
    }
};

export const updateUserById = (req, res) => {
    const updatedUserInfo = req.body;
    const { error } = userSchema.validate(updatedUserInfo, VALIDATION_OPTIONS);

    if (error) {
        res.status(400).json(errorResponse(error.details));
    } else {
        const {
            user,
            params: { id }
        } = req;
        const updatedUser = {
            ...user,
            ...updatedUserInfo,
            id: user.id
        };

        users[id] = updatedUser;

        res.status(200).json(updatedUser);
    }
};

export const deleteUserById = (req, res) => {
    const {
        user,
        params: { id }
    } = req;

    users[id] = {
        ...user,
        isDeleted: true
    };

    res.sendStatus(200);
};
