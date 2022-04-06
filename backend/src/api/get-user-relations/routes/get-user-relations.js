"use strict";
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/get-user-relations/enrollments",
            handler: "get-user-relations.enrollments",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
