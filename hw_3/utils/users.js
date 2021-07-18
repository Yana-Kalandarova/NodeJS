import { v4 as uuid } from 'uuid';
import faker from 'faker';
import { USER_AGE_MAX, USER_AGE_MIN } from '../constants';

export const generateUsers = (count) =>
    Array.from(Array(count)).map(() => ({
        id: uuid(),
        login: faker.name.firstName(),
        password: faker.lorem.word(10),
        age: faker.datatype.number({
            min: USER_AGE_MIN,
            max: USER_AGE_MAX
        })
    }));
