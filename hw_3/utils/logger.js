import winston from 'winston';
import { config } from '../config';
import { ENV } from '../constants';

export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error'
        })
    ]
});

if (config.env !== ENV.prod) {
    logger.add(
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    );
}
