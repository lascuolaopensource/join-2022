module.exports = {
    routes: [
        {
            method: "POST",
            path: "/userexists",
            handler: "userexists.index",
            config: {
                auth: false,
                middlewares: ["plugin::users-permissions.rateLimit"],
            },
        },
    ],
};
