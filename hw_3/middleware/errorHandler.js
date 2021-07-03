import { ValidationError } from '../exceptions';

export const errorHandler = (error, req, res, next) => {
    let status = 500;
    let message = 'Internal Server Error';

    if (error instanceof ValidationError) {
        status = 400;
        message = error.message;
    }

    res.status(status).send(message);
};
