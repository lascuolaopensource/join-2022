import { isBodyValid } from "../../../policies/is-body-valid";
import { routes as r } from "join-shared";

export default {
    routes: [
        // Creates an account
        {
            path: r.Account.Create.path,
            method: r.Account.Create.method,
            handler: "account.create",
            config: {
                policies: [isBodyValid({ schema: r.Account.Create.schema })],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
        // Checks if user with given email exists
        {
            path: r.Account.UserExists.path,
            method: r.Account.UserExists.method,
            handler: "account.userExists",
            config: {
                policies: [
                    isBodyValid({ schema: r.Account.UserExists.schema }),
                ],
                middlewares: [],
            },
        },
    ],
};
