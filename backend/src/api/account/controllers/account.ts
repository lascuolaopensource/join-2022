import { routes as r, types as t } from "join-shared";
import { entities as e } from "../../../utils";

/**
 * A set of functions called "actions" for `account`
 */

export default {
    /**
     * Creates an account
     */
    create: async (ctx, next): Promise<r.Account.Create.Res> => {
        strapi.log.info("CONTROLLER - account/create");

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
            const user = ctx.response.body.user as t.UsersPermissionsMe;

            // Creating userInfo
            const data: t.UserInfoInput = {
                name: body.name,
                surname: body.surname,
                owner: user.id,
            };
            await strapi.entityService.create(e.userInfo, {
                data,
            });

            return user;
        } catch (err) {
            ctx.body = err;
        }
    },

    /**
     * Checks if user with given email exists
     */
    userExists: async (ctx, next): Promise<r.Account.UserExists.Res> => {
        strapi.log.info("CONTROLLER - account/userExists");

        try {
            // Getting body
            const body: r.Account.UserExists.Req = ctx.request.body;

            // Checking if some users exist
            const users: Array<t.ID<t.UsersPermissionsUser>> =
                await strapi.entityService.findMany(e.user, {
                    filters: body,
                });

            // Return true if there are users
            return { exists: users.length > 0 };
        } catch (err) {
            ctx.body = err;
        }
    },
};
