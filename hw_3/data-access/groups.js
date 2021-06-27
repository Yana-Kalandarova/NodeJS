export class GroupDAO {
    constructor(model) {
        this.model = model;
    }

    findGroupById = (id) =>
        this.model.findOne({
            where: {
                id
            }
        });

    createGroup = (groupInfo) => this.model.create({ ...groupInfo });

    updateGroupById = (id, groupInfo) =>
        this.model.update(
            { ...groupInfo },
            {
                where: {
                    id
                }
            }
        );

    deleteGroupById = (id) =>
        this.model.destroy({
            where: {
                id
            }
        });

    findAllGroups = () => this.model.findAll();
}
