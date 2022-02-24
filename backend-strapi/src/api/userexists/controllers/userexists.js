"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        try {
            await shared_1.f.userExists.ueSchema.validate(body);
        }
        catch (e) {
            ctx.badRequest();
        }
        const users = await strapi.entityService.findMany("plugin::users-permissions.user", {
            filters: body,
        });
        return { exists: users.length ? true : false };
    },
};
//# sourceMappingURL=userexists.js.map