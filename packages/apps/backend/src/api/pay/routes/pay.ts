import { routes as r } from "join-shared";
import { isBodyValid } from "../../../policies/is-body-valid";

export default {
    routes: [
        {
            method: r.Pay.Execute.method,
            path: r.Pay.Execute.path,
            handler: "pay.execute",
            config: {
                policies: [
                    isBodyValid({ schema: r.Pay.Execute.schema }),
                    "payment-exists",
                    "is-already-executed",
                    "is-expired",
                ],
                middlewares: [],
            },
        },
        {
            method: r.Pay.Confirm.method,
            path: r.Pay.Confirm.path,
            handler: "pay.confirm",
            config: {
                policies: [isBodyValid({ schema: r.Pay.Confirm.schema })],
                middlewares: [],
            },
        },
    ],
};
