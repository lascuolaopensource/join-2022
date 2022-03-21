"use strict";
module.exports = {
    routes: [
        {
            method: "POST",
            path: "/pay",
            handler: "pay.index",
            config: {
                policies: ["is-already-confirmed"],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/pay/confirm/:code",
            handler: "pay.confirm",
            config: {
                policies: ["is-already-confirmed"],
                middlewares: [],
            },
        },
        {
            method: "GET",
            path: "/pay/get-payment/:hash",
            handler: "pay.getPayment",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ],
};
