import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access';

export const UserModel = sequelize.define(
    'user',
    {
        userId: {
            primaryKey: true,
            type: DataTypes.STRING
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
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    },
    {
        underscored: true,
        paranoid: true
    }
);
