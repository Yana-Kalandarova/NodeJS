import { errorResponse, userSchema, groupSchema } from '../validation';
import { VALIDATION_OPTIONS } from '../constants/validation';

export const validateUserInfo = (req, res, next) => {
    const userInfo = req.body;
    const { error } = userSchema.validate(userInfo, VALIDATION_OPTIONS);

    if (error) {
        return res.status(400).json(errorResponse(error.details));
    }

    next();
};

export const validateGroupInfo = (req, res, next) => {
    const groupInfo = req.body;
    const { error } = groupSchema.validate(
        groupInfo,
        VALIDATION_OPTIONS
    );

    if (error) {
        return res.status(400).json(errorResponse(error.details));
    }

    next();
};
