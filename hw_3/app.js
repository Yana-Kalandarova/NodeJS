import express from 'express';
import { usersRouter, groupsRouter } from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', usersRouter);
app.use('/groups', groupsRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
