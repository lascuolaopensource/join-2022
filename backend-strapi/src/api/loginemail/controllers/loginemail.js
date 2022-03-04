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
        });
        if (users.length == 1) {
            const user = users[0];
            return { email: user.email, username: user.username };
        }
        else {
            ctx.notFound("leNotFound");
        }
    },
};
