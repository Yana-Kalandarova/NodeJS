import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../data-access';
import { GroupModel } from './groupModel';

export const UserModel = sequelize.define(
    'user',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true,
        paranoid: true
    }
);

UserModel.associate = function () {
    this.belongsToMany(GroupModel, {
        through: 'UserGroup',
        as: 'groups',
        foreignKey: 'user_id'
    });
};
