module.exports = {
    routes: [
        {
            method: "POST",
            path: "/pay",
            handler: "pay.index",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/pay/confirm/:code",
            handler: "pay.confirm",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
