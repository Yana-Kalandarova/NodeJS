import { v4 as uuid } from 'uuid';
import faker from 'faker';
import { USER_AGE_MAX, USER_AGE_MIN } from '../constants/validation';

export const getAutoSuggestUsers = (usersList, limitString, loginSubstr) => {
    const numberReqEx = /^\d+$/;
    const limit = numberReqEx.test(limitString) ? Number(limitString) : null;
    let resultUsersList = [...usersList];

    if (loginSubstr) {
        resultUsersList = usersList.filter((user) =>
            user.login.includes(loginSubstr)
        );
    }

    resultUsersList.sort(sortUsers);

    if (limit) {
        resultUsersList = resultUsersList.slice(0, limit);
    }

    return resultUsersList;
};

export const sortUsers = (user1, user2) => (user1.login > user2.login ? 1 : -1);

export const generateUsers = (count) =>
    Array.from(Array(count)).map(() => ({
        userId: uuid(),
        login: faker.name.firstName(),
        password: faker.lorem.word(10),
        age: faker.datatype.number({
            min: USER_AGE_MIN,
            max: USER_AGE_MAX
        })
    }));
