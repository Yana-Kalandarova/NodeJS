import express from 'express';
import { authControllers } from '../controllers';

const authRouter = express.Router();

authRouter.route('/').post(authControllers.authenticateUser);

export default authRouter;
