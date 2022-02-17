module.exports = {
    routes: [
        {
            method: "POST",
            path: "/enroll",
            handler: "enroll.index",
            config: {
                auth: false,
            },
        },
    ],
};
