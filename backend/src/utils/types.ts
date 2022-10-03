export enum LifecycleAction {
    beforeCreate = "beforeCreate",
    beforeCreateMany = "beforeCreateMany",
    afterCreate = "afterCreate",
    afterCreateMany = "afterCreateMany",
    beforeUpdate = "beforeUpdate",
    beforeUpdateMany = "beforeUpdateMany",
    afterUpdate = "afterUpdate",
    afterUpdateMany = "afterUpdateMany",
    beforeDelete = "beforeDelete",
    beforeDeleteMany = "beforeDeleteMany",
    afterDelete = "afterDelete",
    afterDeleteMany = "afterDeleteMany",
    beforeCount = "beforeCount",
    afterCount = "afterCount",
    beforeFindOne = "beforeFindOne",
    afterFindOne = "afterFindOne",
    beforeFindMany = "beforeFindMany",
    afterFindMany = "afterFindMany",
}

export interface LifecycleEvent<T, M> {
    action: LifecycleAction;
    model: M;
    params: {
        data: T;
        select: any;
        where: { id: number };
        orderBy: any;
        limit: any;
        offset: any;
        populate: any;
    };
    result?: any;
    state: any;
}
