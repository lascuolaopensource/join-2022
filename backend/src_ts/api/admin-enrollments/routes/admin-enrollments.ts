import { policies as p } from "../../../utils";
import { types as t } from "shared";

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/admin-enrollments/get-upcoming-courses",
            handler: "admin-enrollments.getUpcomingCourses",
            config: {
                policies: [
                    "global::user-exists",
                    p.isRole({ role: t.UserPermissionRoles.AdminEnrollments }),
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
                    p.isRole({ role: t.UserPermissionRoles.AdminEnrollments }),
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
                    p.isRole({ role: t.UserPermissionRoles.AdminEnrollments }),
                ],
                middlewares: [],
            },
        },
    ],
};
