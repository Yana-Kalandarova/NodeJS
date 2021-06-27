import { UserModel } from '../models';
import { generateUsers } from '../utils/users';
import { connectSequelize, sequelize } from './db';

const createInitialTable = async (count) => {
    await connectSequelize();
    await sequelize.sync({ force: true });

    try {
        const initialUsers = generateUsers(count);

        await UserModel.bulkCreate(initialUsers);
    } catch (error) {
        console.log(error);
    }
};

createInitialTable(3);
