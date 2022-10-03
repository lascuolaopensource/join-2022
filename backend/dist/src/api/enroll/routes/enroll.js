"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/enroll",
            handler: "enroll.index",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
