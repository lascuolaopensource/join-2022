import { policyIsBodyValid } from "../../../utils";
import { endpoints as e } from "shared";

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/user-exists",
            handler: "user-exists.index",
            config: {
                policies: [policyIsBodyValid(e.UserExistsSchema)],
            },
        },
    ],
};
