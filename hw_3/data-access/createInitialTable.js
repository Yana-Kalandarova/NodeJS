import { UserModel } from '../models/userModel';
import { generateUsers } from '../utils/users';
import { connectSequelize, sequelize } from './properties';

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
