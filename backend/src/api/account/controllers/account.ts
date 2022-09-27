import { routes as r, types as t } from "join-shared";
import { entities as e } from "../../../utils";

/**
 * A set of functions called "actions" for `account`
 */

export default {
    create: async (ctx, next): Promise<void> => {
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

            //
        } catch (err) {
            ctx.body = err;
        }
    },
};
