"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleAction = void 0;
//
var LifecycleAction;
(function (LifecycleAction) {
    LifecycleAction["beforeCreate"] = "beforeCreate";
    LifecycleAction["beforeCreateMany"] = "beforeCreateMany";
    LifecycleAction["afterCreate"] = "afterCreate";
    LifecycleAction["afterCreateMany"] = "afterCreateMany";
    LifecycleAction["beforeUpdate"] = "beforeUpdate";
    LifecycleAction["beforeUpdateMany"] = "beforeUpdateMany";
    LifecycleAction["afterUpdate"] = "afterUpdate";
    LifecycleAction["afterUpdateMany"] = "afterUpdateMany";
    LifecycleAction["beforeDelete"] = "beforeDelete";
    LifecycleAction["beforeDeleteMany"] = "beforeDeleteMany";
    LifecycleAction["afterDelete"] = "afterDelete";
    LifecycleAction["afterDeleteMany"] = "afterDeleteMany";
    LifecycleAction["beforeCount"] = "beforeCount";
    LifecycleAction["afterCount"] = "afterCount";
    LifecycleAction["beforeFindOne"] = "beforeFindOne";
    LifecycleAction["afterFindOne"] = "afterFindOne";
    LifecycleAction["beforeFindMany"] = "beforeFindMany";
    LifecycleAction["afterFindMany"] = "afterFindMany";
})(LifecycleAction = exports.LifecycleAction || (exports.LifecycleAction = {}));
