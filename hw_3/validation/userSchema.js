import Joi from 'joi';
import { USER_AGE_MIN, USER_AGE_MAX } from '../constants';

const passwordRegEx = /^[a-zA-Z0-9]{8,}$/;

export const userSchema = Joi.object({
    age: Joi.number().integer().min(USER_AGE_MIN).max(USER_AGE_MAX).required(),

    login: Joi.string().required(),

    password: Joi.string().pattern(passwordRegEx).required()
});
