export enum LifecycleEvent {
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

export interface LifecycleEventParam<T> {
    action: LifecycleEvent;
    model: T;
    params: {
        data: any;
        select: any;
        where: any;
        orderBy: any;
        limit: any;
        offset: any;
        populate: any;
    };
    result?: any;
    state: any;
}
