import { fakeGroup, fakeGroupId } from '../../mocks';

export class GroupManagementService {
    getGroupById = (id) =>
        id === fakeGroupId ? Promise.resolve(fakeGroup) : Promise.resolve(null);

    createGroup = (groupInfo) =>
        Promise.resolve({ ...groupInfo, id: fakeGroupId });

    updateGroupById = (id) =>
        id === fakeGroupId
            ? Promise.resolve([1, fakeGroup])
            : Promise.resolve([0]);

    deleteGroupById = (id) =>
        id === fakeGroupId ? Promise.resolve(1) : Promise.resolve(0);

    getAllGroups = () => Promise.resolve([fakeGroup]);

    addUsersToGroup = () => Promise.resolve(true);
}
