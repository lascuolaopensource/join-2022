"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { sanitize } = utils;
function sanitizeUser(user, ctx) {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel("plugin::users-permissions.user");
    return sanitize.contentAPI.output(user, userSchema, { auth });
}
module.exports = {
    index: async (ctx, next) => {
        strapi.log.info("In register-user controller");
        const body = ctx.request.body;
        const settings = await (0, utils_1.getUserPemissionsSettings)();
        if (!settings.allow_register) {
            throw new ApplicationError("Register action is currently disabled");
        }
        const user = await (0, utils_1.registerUser)(body);
        const sanitizedUser = await sanitizeUser(user, ctx);
        if (settings.email_confirmation) {
            try {
                await (0, utils_1.getService)("user").sendConfirmationEmail(sanitizedUser);
            }
            catch (e) {
                throw new ApplicationError(e.message);
            }
            return ctx.send({ user: sanitizedUser });
        }
        else {
            const jwt = (0, utils_1.getService)("jwt").issue(user.id);
            return ctx.send({
                jwt,
                user: sanitizedUser,
            });
        }
    },
};
