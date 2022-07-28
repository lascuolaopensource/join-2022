"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    enrollments: async (ctx, next) => {
        strapi.log.info("In getUserRelations/enrollments controller.");
        const user = ctx.state.user;
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
    tools: async (ctx, next) => {
        strapi.log.info("In getUserRelations/tools controller.");
        const usr = ctx.state.user;
        const user = await strapi.entityService.findOne(utils_1.entities.user, usr.id, {
            populate: {
                tools_bookings: {
                    populate: {
                        slots: {
                            populate: ["tool"],
                        },
                    },
                },
            },
            sort: {
                tools_bookings: {
                    slots: {
                        start: "desc",
                    },
                },
            },
        });
        const bookings = user.tools_bookings;
        return bookings;
    },
};
