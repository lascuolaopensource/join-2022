import { routes as r } from "join-shared";

export default {
    routes: [
        {
            method: r.Pay.Execute.method,
            path: r.Pay.Execute.path,
            handler: "pay.execute",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
