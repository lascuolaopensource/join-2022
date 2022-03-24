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
        const user = await (0, utils_1.getUserByEmail)(body.email);
        if (user) {
            const userInfo = await (0, utils_1.getUserInfo)(user.id);
            return { email: user.email, name: userInfo.name };
        }
        else {
            throw new ApplicationError("leNotFound");
        }
    },
};
