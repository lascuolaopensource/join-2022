import { routes as r } from "join-shared";

export default {
    routes: [
        {
            method: r.Enroll.method,
            path: r.Enroll.path,
            handler: "enroll.index",
            config: {
                policies: [
                    "is-enroll-body-valid",
                    "past-deadline",
                    "user-exists",
                    "already-enrolled",
                ],
                middlewares: [],
            },
        },
    ],
};
