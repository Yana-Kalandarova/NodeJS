import { errorResponse, userSchema } from '../validation';
import { VALIDATION_OPTIONS } from '../constants/validation';

export const validateUserInfo = (req, res, next) => {
    const userInfo = req.body;
    const { validationError } = userSchema.validate(
        userInfo,
        VALIDATION_OPTIONS
    );

    if (validationError) {
        res.status(400).json(errorResponse(validationError.details));
    }

    next();
};
