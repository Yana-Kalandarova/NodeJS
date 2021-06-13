import { Op } from 'sequelize';

export class UserManagementService {
    constructor(model) {
        this.model = model;
    }

    getUserById = (id) =>
        this.model.findOne({
            where: {
                id
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
