import { policies as p } from "../../../utils";
import { endpoints as e } from "shared";

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/login-email",
            handler: "login-email.index",
            config: {
                policies: [p.isBodyValid({ schema: e.LoginEmailSchema })],
            },
        },
    ],
};
