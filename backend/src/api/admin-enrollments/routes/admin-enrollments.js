"use strict";
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/admin-enrollments/get-active-courses",
            handler: "admin-enrollments.getActiveCourses",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "POST",
            path: "/admin-enrollments/update",
            handler: "admin-enrollments.update",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
