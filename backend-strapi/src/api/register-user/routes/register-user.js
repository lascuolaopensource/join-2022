module.exports = {
    routes: [
        {
            method: "POST",
            path: "/register-user",
            handler: "register-user.index",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
