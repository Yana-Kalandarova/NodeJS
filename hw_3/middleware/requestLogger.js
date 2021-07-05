import { logger } from '../utils/logger';

export const requestLogger = (req, res, next) => {
    logger.info(`request method: ${req.method}`);
    logger.info(`request url: ${req.url}`);
    logger.info(`request query: ${JSON.stringify(req.query)}`);
    logger.info(`request body: ${JSON.stringify(req.body)}`);

    next();
};
