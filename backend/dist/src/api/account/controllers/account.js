"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
/**
 * A set of functions called "actions" for `account`
 */
exports.default = {
    create: async (ctx, next) => {
        try {
            // Getting body
            const body = ctx.request.body;
            // Adding username to body, in order to comply with auth controller
            body["username"] = body.email;
            // Registering user by calling u&p auth controller
            await strapi
                .service("api::account.use-auth-controller")
                .register(ctx);
            // Getting user
            const user = ctx.response.body.user;
            // Creating userInfo
            const data = {
                name: body.name,
                surname: body.surname,
                owner: user.id,
            };
            await strapi.entityService.create(utils_1.entities.userInfo, {
                data,
            });
            return user;
        }
        catch (err) {
            ctx.body = err;
        }
    },
};
