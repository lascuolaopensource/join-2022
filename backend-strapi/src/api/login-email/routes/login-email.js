"use strict";
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/login-email",
            handler: "login-email.index",
            config: {
                auth: false,
            },
        },
    ],
};
