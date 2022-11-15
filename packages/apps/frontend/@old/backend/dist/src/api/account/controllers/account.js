"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
/**
 * A set of functions called "actions" for `account`
 */
exports.default = {
    /**
     * Creates an account
     */
    create: async (ctx, next) => {
        strapi.log.info("CONTROLLER - account/create");
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
    /**
     * Checks if user with given email exists
     */
    userExists: async (ctx, next) => {
        strapi.log.info("CONTROLLER - account/userExists");
        try {
            // Getting body
            const body = ctx.request.body;
            // Checking if some users exist
            const users = await strapi.entityService.findMany(utils_1.entities.user, {
                filters: body,
            });
            // Return true if there are users
            return { exists: users.length > 0 };
        }
        catch (err) {
            ctx.body = err;
        }
    },
};
