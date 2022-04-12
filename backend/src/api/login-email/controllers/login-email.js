"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
module.exports = {
    async index(ctx) {
        const body = ctx.request.body;
        const email = body.email.toLowerCase();
        const user = await (0, utils_1.getUserByEmail)(email);
        if (user) {
            if (!user.confirmed) {
                return ctx.unauthorized(shared_1.Errors.UserNotConfirmed);
            }
            const userInfo = await (0, utils_1.getUserInfo)(user.id);
            if (!userInfo) {
                return ctx.internalServerError(shared_1.Errors.MissingUserInfo);
            }
            return {
                email: user.email,
                name: userInfo.name,
            };
        }
        else {
            return ctx.notFound(shared_1.Errors.NotFound, { entity: "user" });
        }
    },
};
