import { CTX } from "../../../utils";
import { routes as r } from "join-shared";

/**
 * A set of functions called "actions" for `pay`
 */

export default {
    execute: async (ctx: CTX<r.Pay.Execute.Req>, next) => {
        try {
            ctx.body = "ok";
        } catch (err) {
            ctx.body = err;
        }
    },
};
