import { sequelize } from '../data-access';
import { logger } from '../utils';
import { UserModel } from './userModel';
import { GroupModel } from './groupModel';

UserModel.associate();
GroupModel.associate();

sequelize
    .sync()
    .then(() => logger.info('All models were successfully synchronized'));

export { UserModel, GroupModel };
