import express from 'express';
import * as usersControllers from '../controllers/users';

const usersRouter = express.Router();

usersRouter.route('/')
    .get(usersControllers.getUsers)
    .post(usersControllers.addUser);

usersRouter.route('/:id')
    .get(usersControllers.getUserById)
    .put(usersControllers.updateUserById)
    .delete(usersControllers.deleteUserById);

export default usersRouter;
