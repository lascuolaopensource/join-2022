"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_body_valid_1 = require("../../../policies/is-body-valid");
const join_shared_1 = require("join-shared");
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/account/create",
            handler: "account.create",
            config: {
                policies: [(0, is_body_valid_1.isBodyValid)({ schema: join_shared_1.routes.Account.Create.schema })],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
    ],
};
