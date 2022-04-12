import { policies as p } from "../../../utils";
import { endpoints as e } from "shared";

module.exports = {
    routes: [
        {
            method: "POST",
            path: "/user-exists",
            handler: "user-exists.index",
            config: {
                policies: [p.isBodyValid({ schema: e.UserExistsSchema })],
            },
        },
    ],
};
