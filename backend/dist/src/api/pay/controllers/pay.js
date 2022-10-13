"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A set of functions called "actions" for `pay`
 */
exports.default = {
    execute: async (ctx, next) => {
        try {
            ctx.body = "ok";
        }
        catch (err) {
            ctx.body = err;
        }
    },
};
