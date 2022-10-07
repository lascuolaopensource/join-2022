import { routes as r } from "join-shared";
import { isBodyValid } from "../../../policies/is-body-valid";

export default {
    routes: [
        {
            method: r.Enroll.method,
            path: r.Enroll.path,
            handler: "enroll.index",
            config: {
                policies: ["is-enroll-body-valid", "user-exists"],
                middlewares: [],
            },
        },
    ],
};
