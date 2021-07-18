import express from 'express';
import cors from 'cors';
import { usersRouter, groupsRouter, authRouter } from './routes';
import { requestLogger, errorHandler } from './middleware';
import { logger } from './utils';
import { CORS_OPTIONS } from './constants';
import { config } from './config';

const app = express();
const port = config.port || 3000;

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(requestLogger);

app.use('/login', authRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.use(errorHandler);

process
    .on('uncaughtException', (error) =>
        logger.error(`uncaughtException: ${error}`)
    )
    .on('unhandledRejection', (error) =>
        logger.error(`unhandledRejection: ${error}`)
    );

app.listen(port, () => console.log(`App listening on port ${port}!`));
