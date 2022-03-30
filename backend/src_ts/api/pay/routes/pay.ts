import { endpoints as e } from "shared";

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
                    {
                        name: "global::isBodyValid",
                        config: {
                            schema: e.PaySchema,
                        },
                    },
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
