export class GroupManagementService {
    constructor(daoModel) {
        this.daoModel = daoModel;
    }

    getGroupById = (id) => this.daoModel.findGroupById(id);

    createGroup = (groupInfo) => this.daoModel.createGroup(groupInfo);

    updateGroupById = (id, groupInfo) =>
        this.daoModel.updateGroupById(id, groupInfo);

    deleteGroupById = (id) => this.daoModel.deleteGroupById(id);

    getAllGroups = () => this.daoModel.findAllGroups();

    addUsersToGroup = (groupId, userIds) =>
        this.daoModel.addUsersToGroup(groupId, userIds);
}
