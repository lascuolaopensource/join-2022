"use strict";
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/get-user-relations/enrollments",
            handler: "get-user-relations.enrollments",
            config: {
                policies: ["global::user-exists"],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/get-user-relations/role",
            handler: "get-user-relations.role",
            config: {
                policies: ["global::user-exists"],
                middlewares: [],
            },
        },
    ],
};
