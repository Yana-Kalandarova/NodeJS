import {
    ValidationError,
    NotFoundError,
    InvalidTokenError
} from '../exceptions';
import { logger } from '../utils';

export const errorHandler = (error, req, res, next) => {
    let status;
    let title;
    const { message } = error;

    switch (error.constructor) {
        case ValidationError:
            status = 400;
            title = 'Bad Request';
            break;
        case NotFoundError:
            status = 404;
            title = 'Not Found';
            break;
        case InvalidTokenError:
            status = 403;
            title = 'Forbidden';
            break;
        default:
            status = 500;
            title = 'Internal Server Error';
    }

    logger.error(
        `${title}:
        ${req.method} ${req.url} with params ${JSON.stringify(req.body)}.
        Error: ${message}`
    );

    res.status(status).send({ title, message });
};
