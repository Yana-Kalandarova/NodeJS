import { sequelize } from './db';
import { GroupModel, UserModel } from '../models';

export class GroupDAO {
    constructor(model) {
        this.model = model;
    }

    findGroupById = (id) =>
        this.model.findOne({
            where: {
                id
            }
        });

    createGroup = (groupInfo) => this.model.create({ ...groupInfo });

    updateGroupById = (id, groupInfo) =>
        this.model.update(
            { ...groupInfo },
            {
                where: {
                    id
                }
            }
        );

    deleteGroupById = (id) =>
        this.model.destroy({
            where: {
                id
            }
        });

    findAllGroups = () => this.model.findAll();

    addUsersToGroup = async (groupId, userIds) => {
        try {
            return await sequelize.transaction(async (transaction) => {
                const group = await GroupModel.findOne({
                    where: { id: groupId }
                });
                const users = await UserModel.findAndCountAll({
                    where: { id: userIds }
                });

                if (group && users.count === userIds.length) {
                    await group.addUsers(userIds, {
                        transaction
                    });

                    return true;
                }

                throw new Error();
            });
        } catch (error) {
            return false;
        }
    };
}
