"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        try {
            await shared_1.endpoints.UserExistsSchema.validate(body);
        }
        catch (err) {
            return ctx.badRequest(shared_1.Errors.ValidationError);
        }
        const user = await strapi.query(utils_1.entities.user).findOne({
            where: body,
        });
        return { exists: user ? true : false };
    },
};
