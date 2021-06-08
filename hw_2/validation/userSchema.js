import Joi from 'joi';

const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

export const userSchema = Joi.object({
    age: Joi.number().integer().min(4).max(130).required(),

    login: Joi.string().required(),

    password: Joi.string().pattern(passwordRegEx).required()
});
