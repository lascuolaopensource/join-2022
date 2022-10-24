"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_shared_1 = require("join-shared");
const is_body_valid_1 = require("../../../policies/is-body-valid");
exports.default = {
    routes: [
        {
            method: join_shared_1.routes.Pay.Execute.method,
            path: join_shared_1.routes.Pay.Execute.path,
            handler: "pay.execute",
            config: {
                policies: [
                    (0, is_body_valid_1.isBodyValid)({ schema: join_shared_1.routes.Pay.Execute.schema }),
                    "payment-exists",
                    "is-already-executed",
                    "is-expired",
                ],
                middlewares: [],
            },
        },
        {
            method: join_shared_1.routes.Pay.Confirm.method,
            path: join_shared_1.routes.Pay.Confirm.path,
            handler: "pay.confirm",
            config: {
                policies: [(0, is_body_valid_1.isBodyValid)({ schema: join_shared_1.routes.Pay.Confirm.schema })],
                middlewares: [],
            },
        },
    ],
};
