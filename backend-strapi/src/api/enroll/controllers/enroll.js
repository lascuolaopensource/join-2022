"use strict";

/**
 * A set of functions called "actions" for `enroll`
 */

module.exports = {
    index: async (ctx, next) => {
        console.log(ctx.request.body);
        console.log(ctx.state.user);
        try {
            ctx.body = "ok";
        } catch (err) {
            ctx.body = err;
        }
    },
};
