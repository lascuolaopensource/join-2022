export default {
    routes: [
        {
            method: "POST",
            path: "/account/create",
            handler: "account.create",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
