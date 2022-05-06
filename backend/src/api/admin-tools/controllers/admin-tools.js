"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    updateSlots: async (ctx, next) => {
        strapi.log.info("In admin-tools/updateSlots controller");
        const { changes } = ctx.request.body;
        changes.forEach(async (c) => {
        });
        return {};
    },
};
