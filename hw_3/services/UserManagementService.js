// TODO: hash user password before save to db
// https://www.npmjs.com/package/bcrypt
export class UserManagementService {
    constructor(daoModel) {
        this.daoModel = daoModel;
    }

    getUserById = (id) => this.daoModel.findUserById(id);

    getUserByName = (login) => this.daoModel.findUserByName(login);

    createUser = (userInfo) => this.daoModel.createUser(userInfo);

    updateUserById = (id, userInfo) =>
        this.daoModel.updateUserById(id, userInfo);

    deleteUserById = (id) => this.daoModel.deleteUserById(id);

    findUsersByQuery = (login, limit) =>
        this.daoModel.findUsersByQuery(login, limit);
}
