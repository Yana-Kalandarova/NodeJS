import express from 'express';
import * as groupsControllers from '../controllers/groups';
import { validateGroupInfo } from '../middleware';

const groupsRouter = express.Router();

groupsRouter.route('/')
    .get(groupsControllers.getGroups)
    .post(validateGroupInfo, groupsControllers.addGroup);

groupsRouter.route('/:id')
    .get(groupsControllers.getGroupById)
    .put(validateGroupInfo, groupsControllers.updateGroupById)
    .delete(groupsControllers.deleteGroupById);

groupsRouter.route('/add-users')
    .post(groupsControllers.addUsersToGroup);

export default groupsRouter;
