module.exports = {
    routes: [
        {
            method: "POST",
            path: "/pay",
            handler: "pay.index",
            config: {
                policies: [],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
        {
            method: "GET",
            path: "/pay/confirm/:code",
            handler: "pay.confirm",
            config: {
                policies: [],
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
    ],
};
