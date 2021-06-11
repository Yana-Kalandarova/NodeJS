import express from 'express';
import * as usersHandlers from '../handlers/users';

const usersRouter = express.Router();

usersRouter.param('id', usersHandlers.findUserById);

usersRouter.route('/')
    .get(usersHandlers.getUsers)
    .post(usersHandlers.addUser);

usersRouter.route('/:id')
    .get(usersHandlers.getUserById)
    .put(usersHandlers.updateUserById)
    .delete(usersHandlers.deleteUserById);

export default usersRouter;
