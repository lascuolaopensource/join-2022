"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const shared_1 = require("shared");
module.exports = {
    routes: [
        {
            method: "GET",
            path: "/pay/get-payment-details/:hash",
            handler: "pay.getPaymentDetails",
            config: {
                policies: ["payment-exists"],
                middlewares: [],
            },
        },
        {
            method: "POST",
            path: "/pay/:hash",
            handler: "pay.index",
            config: {
                policies: [
                    "payment-exists",
                    "is-expired",
                    "is-already-paid",
                    (0, utils_1.policyIsBodyValid)(shared_1.endpoints.PaySchema),
                ],
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
