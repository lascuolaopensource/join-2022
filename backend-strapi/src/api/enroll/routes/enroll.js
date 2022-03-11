module.exports = {
    routes: [
        {
            method: "POST",
            path: "/enroll",
            handler: "enroll.index",
            config: {
                policies: ["is-payload-valid", "is-enrollable"],
                middlewares: [],
            },
        },
    ],
};
