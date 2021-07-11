import { UserModel } from '../models';
import { generateUsers, logger } from '../utils';
import { connectSequelize, sequelize } from './db';

const createInitialTable = async (count) => {
    await connectSequelize();
    await sequelize.sync({ force: true });

    try {
        const initialUsers = generateUsers(count);

        await UserModel.bulkCreate(initialUsers);
    } catch (error) {
        logger.error(error);
    }
};

createInitialTable(3);
