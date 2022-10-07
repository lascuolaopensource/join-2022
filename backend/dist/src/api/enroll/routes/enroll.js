"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_shared_1 = require("join-shared");
exports.default = {
    routes: [
        {
            method: join_shared_1.routes.Enroll.method,
            path: join_shared_1.routes.Enroll.path,
            handler: "enroll.index",
            config: {
                policies: ["is-enroll-body-valid", "user-exists"],
                middlewares: [],
            },
        },
    ],
};
