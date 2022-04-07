"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    enrollments: async (ctx, next) => {
        strapi.log.info("In getUserRelations/enrollments controller.");
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest(shared_1.Errors.UserNotFound);
        }
        const enrollments = await (0, utils_1.getUserEnrollments)(user.id);
        return { enrollments };
    },
    role: async (ctx, next) => {
        strapi.log.info("In getUserRelations/role controller.");
        const user = ctx.state.user;
        if (!user.role) {
            return ctx.notFound(shared_1.Errors.NotFound);
        }
        const role = user.role;
        return { role: role.type };
    },
};
