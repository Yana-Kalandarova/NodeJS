import Joi from 'joi';
import { GROUP_PERMISSION_LIST } from '../constants';

export const groupSchema = Joi.object({
    name: Joi.string().required(),

    permission: Joi.array().required().items(...GROUP_PERMISSION_LIST)
});
