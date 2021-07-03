import { errorResponse, userSchema, groupSchema } from '../validation';
import { VALIDATION_OPTIONS } from '../constants/validation';
import { ValidationError } from '../exceptions';

export const validateUserInfo = (req, res, next) => {
    const userInfo = req.body;
    const { error } = userSchema.validate(userInfo, VALIDATION_OPTIONS);

    if (error) {
        throw new ValidationError(errorResponse(error.details));
    }

    next(error);
};

export const validateGroupInfo = (req, res, next) => {
    const groupInfo = req.body;
    const { error } = groupSchema.validate(groupInfo, VALIDATION_OPTIONS);

    if (error) {
        throw new ValidationError(errorResponse(error.details));
    }

    next(error);
};
