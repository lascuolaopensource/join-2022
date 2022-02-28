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
            method: "POST",
            path: "/pay/confirm",
            handler: "pay.confirm",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
