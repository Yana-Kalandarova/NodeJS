import { Sequelize } from 'sequelize';
import { logger } from '../utils';
import { config } from '../config';

export const sequelize = new Sequelize(config.dbConnectionString);
export const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};
