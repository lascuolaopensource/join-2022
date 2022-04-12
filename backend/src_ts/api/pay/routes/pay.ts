import { policyIsBodyValid } from "../../../utils";
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
                    policyIsBodyValid(e.PaySchema),
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
