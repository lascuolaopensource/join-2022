import { routes as r } from "join-shared";
import { isBodyValid } from "../../../policies/is-body-valid";

export default {
    routes: [
        // Updates the enrollments
        {
            method: r.Admin.Enrollments.Update.method,
            path: r.Admin.Enrollments.Update.path,
            handler: "admin-enrollments.update",
            config: {
                policies: [
                    isBodyValid({ schema: r.Admin.Enrollments.Update.schema }),
                ],
            },
        },
        // Confirms the course
        {
            method: "GET",
            path: "/admin-enrollments/confirm-course/:courseID",
            handler: "admin-enrollments.confirmCourse",
        },
    ],
};
