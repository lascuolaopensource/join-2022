import { policyIsBodyValid } from "../../../utils";
import { endpoints as e } from "shared";

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/login-email",
            handler: "login-email.index",
            config: {
                policies: [policyIsBodyValid(e.LoginEmailSchema)],
            },
        },
    ],
};
