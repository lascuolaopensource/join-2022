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
    ],
};
