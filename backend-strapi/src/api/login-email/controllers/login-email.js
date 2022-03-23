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
            await shared_1.e.LoginEmailSchema.validate(body);
        }
        catch (err) {
            throw new ApplicationError("leBadRequest");
        }
        const users = await strapi.entityService.findMany(utils_1.entities.user, {
            filters: body,
            populate: {
                userInfo: true,
            },
        });
        if (users.length == 1) {
            const user = users[0];
            const userInfo = user.userInfo;
            return { email: user.email, name: userInfo.name };
        }
        else {
            throw new ApplicationError("leNotFound");
        }
    },
};
