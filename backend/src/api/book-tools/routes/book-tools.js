"use strict";
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/book-tools/check-availability",
            handler: "book-tools.checkAvailability",
            config: {
                policies: [],
                middlewares: [],
            },
        },
        {
            method: "POST",
            path: "/book-tools/book",
            handler: "book-tools.book",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
