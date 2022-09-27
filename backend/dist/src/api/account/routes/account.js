"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_body_valid_1 = require("../../../policies/is-body-valid");
const join_shared_1 = require("join-shared");
exports.default = {
    routes: [
        // Creates an account
        {
            path: join_shared_1.routes.Account.Create.path,
            method: join_shared_1.routes.Account.Create.method,
            handler: "account.create",
            config: {
                policies: [(0, is_body_valid_1.isBodyValid)({ schema: join_shared_1.routes.Account.Create.schema })],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
        // Checks if user with given email exists
        {
            path: join_shared_1.routes.Account.UserExists.path,
            method: join_shared_1.routes.Account.UserExists.method,
            handler: "account.userExists",
            config: {
                policies: [
                    (0, is_body_valid_1.isBodyValid)({ schema: join_shared_1.routes.Account.UserExists.schema }),
                ],
                middlewares: [],
            },
        },
    ],
};
