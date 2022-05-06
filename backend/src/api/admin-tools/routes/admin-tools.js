"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/admin-tools/update-slots",
            handler: "admin-tools.updateSlots",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
