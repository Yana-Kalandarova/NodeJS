import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';

const connectionString = process.env.CONNECTION_STRING;

export const sequelize = new Sequelize(connectionString);
export const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};
