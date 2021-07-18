import { Op } from 'sequelize';

export class UserDAO {
    constructor(model) {
        this.model = model;
    }

    findUserById = (id) =>
        this.model.findOne({
            where: {
                id
            }
        });

    findUserByName = (login) =>
        this.model.findOne({
            where: {
                login
            }
        });

    createUser = (userInfo) => this.model.create({ ...userInfo });

    updateUserById = (id, userInfo) =>
        this.model.update(
            { ...userInfo },
            {
                where: {
                    id
                }
            }
        );

    deleteUserById = (id) =>
        this.model.destroy({
            where: {
                id
            }
        });

    findUsersByQuery = (login, limit) =>
        this.model.findAll({
            where: {
                ...(login && { login: { [Op.substring]: login } })
            },
            order: [['login', 'ASC']],
            limit
        });
}
