export const fakeUserId = 456;

export const fakeUserPassword = 'fakeUserPassword';

export const fakeUserLogin = 'fakeUserLogin';

export const fakeUserInfo = {
    login: fakeUserLogin,
    age: 35,
    password: fakeUserPassword
};

export const fakeUser = {
    id: fakeUserId,
    ...fakeUserInfo
};
