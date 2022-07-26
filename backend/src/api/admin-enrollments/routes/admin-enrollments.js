"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const shared_1 = require("shared");
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/admin-enrollments/get-upcoming-courses",
            handler: "admin-enrollments.getUpcomingCourses",
            config: {
                policies: [
                    "global::user-exists",
                    utils_1.policies.isRole({ role: shared_1.types.UserPermissionRoles.AdminEnrollments }),
                ],
                middlewares: [],
            },
        },
        {
            method: "POST",
            path: "/admin-enrollments/update",
            handler: "admin-enrollments.update",
            config: {
                policies: [
                    "global::user-exists",
                    utils_1.policies.isRole({ role: shared_1.types.UserPermissionRoles.AdminEnrollments }),
                ],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/admin-enrollments/close-course/:courseID",
            handler: "admin-enrollments.closeCourse",
            config: {
                policies: [
                    "global::user-exists",
                    utils_1.policies.isRole({ role: shared_1.types.UserPermissionRoles.AdminEnrollments }),
                ],
                middlewares: [],
            },
        },
    ],
};
