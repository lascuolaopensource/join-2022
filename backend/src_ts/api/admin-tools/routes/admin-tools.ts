module.exports = {
    routes: [
        {
            method: "POST",
            path: "/admin-tools/update-slots",
            handler: "admin-tools.updateSlots",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/admin-tools/delete-booking/:id",
            handler: "admin-tools.deleteBooking",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
