"use strict";
/**
 * A set of functions called "actions" for `register-user`
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    create: async (ctx, next) => {
        try {
            // Getting body
            const body = ctx.request.body;
            // Registering user by calling u&p auth controller
            await strapi
                .service("api::account.use-auth-controller")
                .register(ctx);
            // Getting user
            const user = ctx.response.body.user;
            console.log(user);
        }
        catch (err) {
            ctx.body = err;
        }
    },
};
