"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        try {
            await shared_1.f.loginEmail.leSchema.validate(body);
        }
        catch (e) {
            ctx.badRequest("leBadRequest");
        }
        const users = await strapi.entityService.findMany("plugin::users-permissions.user", {
            filters: body,
            populate: {
                userInfo: true,
            },
        });
        if (users.length == 1) {
            const user = users[0];
            const userInfo = user.userInfo;
            return { email: user.email, name: userInfo.name };
        }
        else {
            ctx.notFound("leNotFound");
        }
    },
};
