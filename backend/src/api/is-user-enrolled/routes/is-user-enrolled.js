"use strict";
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/is-user-enrolled/:courseID",
            handler: "is-user-enrolled.index",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
