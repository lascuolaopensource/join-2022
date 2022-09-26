import { routes as r } from "join-shared";

/**
 * A set of functions called "actions" for `register-user`
 */

export default {
    create: async (ctx, next) => {
        try {
            // Getting body
            const body: r.Account.Create.Req = ctx.request.body;

            // Adding username to body, in order to comply with auth controller
            body["username"] = body.email;

            // Registering user by calling u&p auth controller
            await strapi
                .service("api::account.use-auth-controller")
                .register(ctx);

            // Getting user
            const user = ctx.response.body.user;

            console.log(user);
        } catch (err) {
            ctx.body = err;
        }
    },
};
