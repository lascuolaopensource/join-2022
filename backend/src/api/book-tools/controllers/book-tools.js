"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    book: async (ctx, next) => {
        strapi.log.info("In book-tools/index controller");
    },
    checkAvailability: async (ctx, next) => {
        strapi.log.info("In book-tools/check-availability controller");
        const body = ctx.request.body;
        console.log(body);
        try {
            ctx.body = { ok: "ok" };
        }
        catch (err) {
            ctx.body = { err };
        }
    },
};
