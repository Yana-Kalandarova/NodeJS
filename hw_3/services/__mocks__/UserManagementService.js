import { fakeUserId, fakeUser, fakeUserLogin } from '../../mocks';

export class UserManagementService {
    getUserById = (id) =>
        id === fakeUserId ? Promise.resolve(fakeUser) : Promise.resolve(null);

    getUserByName = (login) =>
        login === fakeUserLogin
            ? Promise.resolve(fakeUser)
            : Promise.resolve(null);

    createUser = (userInfo) => Promise.resolve({ ...userInfo, id: fakeUserId });

    updateUserById = (id) =>
        id === fakeUserId
            ? Promise.resolve([1, fakeUser])
            : Promise.resolve([0]);

    deleteUserById = (id) =>
        id === fakeUserId ? Promise.resolve(1) : Promise.resolve(0);

    findUsersByQuery = () => Promise.resolve([fakeUser]);
}
