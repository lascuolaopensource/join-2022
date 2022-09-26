import { isBodyValid } from "../../../policies/is-body-valid";
import { routes as r } from "join-shared";

export default {
    routes: [
        {
            method: "POST",
            path: "/account/create",
            handler: "account.create",
            config: {
                policies: [isBodyValid({ schema: r.Account.Create.schema })],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
    ],
};
