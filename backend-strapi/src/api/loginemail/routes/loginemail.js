module.exports = {
    routes: [
        {
            method: "POST",
            path: "/loginemail",
            handler: "loginemail.index",
            config: {
                auth: false,
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
    ],
};
