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
    ],
};
