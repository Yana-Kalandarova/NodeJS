import express from 'express';
import { usersControllers } from '../controllers';
import { validateUserInfo } from '../middleware';

const usersRouter = express.Router();

usersRouter.route('/')
    .get(usersControllers.getUsers)
    .post(validateUserInfo, usersControllers.addUser);

usersRouter.route('/:id')
    .get(usersControllers.getUserById)
    .put(validateUserInfo, usersControllers.updateUserById)
    .delete(usersControllers.deleteUserById);

export default usersRouter;
