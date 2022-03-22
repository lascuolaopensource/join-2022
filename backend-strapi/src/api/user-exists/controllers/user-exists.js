"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        try {
            await shared_1.e.UserExistsSchema.validate(body);
        }
        catch (err) {
            throw new ApplicationError("UserExistsValidationFailed");
        }
        const user = await strapi.query(utils_1.entities.user).findOne({
            where: body,
        });
        return { exists: user ? true : false };
    },
};
