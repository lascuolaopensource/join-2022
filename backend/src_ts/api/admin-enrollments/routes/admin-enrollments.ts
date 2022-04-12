import { policies as p } from "../../../utils";
import { endpoints as e, types as t } from "shared";

module.exports = {
    routes: [
        {
            method: "GET",
            path: "/admin-enrollments/get-active-courses",
            handler: "admin-enrollments.getActiveCourses",
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
                    p.isBodyValid({ schema: e.AdminEnrollmentsUpdateSchema }),
                ],
                middlewares: [],
            },
        },
    ],
};
