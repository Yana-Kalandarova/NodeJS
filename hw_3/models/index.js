import { sequelize } from '../data-access';
import { UserModel } from './userModel';
import { GroupModel } from './groupModel';

UserModel.associate();
GroupModel.associate();

sequelize
    .sync()
    .then(() => console.log('All models were successfully synchronized'));

export { UserModel, GroupModel };
