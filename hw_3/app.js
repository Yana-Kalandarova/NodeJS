import express from 'express';
import { usersRouter, groupsRouter } from './routes';
import { requestLogger } from './middleware';
import { logger } from './utils/logger';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

process
    .on('uncaughtException', (err) => logger.error(`uncaughtException: ${err}`))
    .on('unhandledRejection', (err) =>
        logger.error(`unhandledRejection: ${err}`)
    );

app.listen(port, () => console.log(`App listening on port ${port}!`));
