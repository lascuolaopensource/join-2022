"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        const user = await strapi.query(utils_1.entities.user).findOne({
            where: body,
        });
        return { exists: user ? true : false };
    },
};
