import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../data-access';
import { GROUP_PERMISSION_LIST } from '../constants/validation';
import { UserModel } from './userModel';

export const GroupModel = sequelize.define(
    'group',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.ENUM(...GROUP_PERMISSION_LIST)),
            allowNull: false
        }
    },
    {
        underscored: true
    }
);

GroupModel.associate = function () {
    this.belongsToMany(UserModel, {
        through: 'UserGroup',
        as: 'users'
    });
};

GroupModel.sync();
