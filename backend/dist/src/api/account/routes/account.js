"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: "POST",
            path: "/account/create",
            handler: "account.create",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
