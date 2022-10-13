"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_shared_1 = require("join-shared");
exports.default = {
    routes: [
        {
            method: join_shared_1.routes.Pay.Execute.method,
            path: join_shared_1.routes.Pay.Execute.path,
            handler: "pay.execute",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
