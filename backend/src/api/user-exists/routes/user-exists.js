"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const shared_1 = require("shared");
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/user-exists",
            handler: "user-exists.index",
            config: {
                policies: [utils_1.policies.isBodyValid({ schema: shared_1.endpoints.UserExistsSchema })],
            },
        },
    ],
};
