"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const shared_1 = require("shared");
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/login-email",
            handler: "login-email.index",
            config: {
                policies: [(0, utils_1.policyIsBodyValid)(shared_1.endpoints.LoginEmailSchema)],
            },
        },
    ],
};
