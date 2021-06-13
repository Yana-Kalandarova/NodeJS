import { Op } from 'sequelize';
import { userSchema, errorResponse } from '../validation';
import { VALIDATION_OPTIONS } from '../constants/validation';
import { UserModel } from '../models/userModel';

export const getUserById = async (req, res) => {
    const {
        params: { id }
    } = req;
    const user = await UserModel.findOne({
        where: {
            id
        }
    });

    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
};

export const getUsers = async (req, res) => {
    const {
        query: { login, limit }
    } = req;

    const resultsUsersList = await UserModel.findAll({
        where: {
            ...(login && { login: { [Op.substring]: login } })
        },
        order: [['login', 'ASC']],
        limit,
        fields: ['id', 'login', 'password', 'age']
    });

    if (resultsUsersList.length) {
        res.json(resultsUsersList);
    } else {
        res.sendStatus(404);
    }
};

export const addUser = async (req, res) => {
    const userInfo = req.body;
    const { error } = userSchema.validate(userInfo, VALIDATION_OPTIONS);

    if (error) {
        res.status(400).json(errorResponse(error.details));
    } else {
        const { dataValues: user } = await UserModel.create(
            { ...userInfo },
            {
                fields: ['id', 'login', 'password', 'age']
            }
        );

        res.status(201).json(user);
    }
};

export const updateUserById = async (req, res) => {
    const updatedUserInfo = req.body;
    const { error } = userSchema.validate(updatedUserInfo, VALIDATION_OPTIONS);

    if (error) {
        res.status(400).json(errorResponse(error.details));
    } else {
        const {
            params: { id }
        } = req;

        const { dataValues: user } = await UserModel.update(
            { ...updatedUserInfo },
            {
                where: {
                    id
                },
                fields: ['id', 'login', 'password', 'age']
            }
        );

        res.status(200).json(user);
    }
};

export const deleteUserById = async (req, res) => {
    const {
        params: { id }
    } = req;

    await UserModel.destroy({
        where: {
            id
        }
    });

    res.sendStatus(200);
};
