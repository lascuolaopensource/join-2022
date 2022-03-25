"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
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
            return ctx.forbidden(shared_1.Errors.RegisterDisabled);
        }
        let user = {};
        try {
            user = await (0, utils_1.registerUser)(body);
        }
        catch (e) {
            return (0, utils_1.registerUserErrorHandler)(e, ctx);
        }
        const sanitizedUser = await sanitizeUser(user, ctx);
        if (settings.email_confirmation) {
            try {
                await (0, utils_1.getService)("user").sendConfirmationEmail(sanitizedUser);
            }
            catch (e) {
                console.log(e);
                return ctx.internalServerError(shared_1.Errors.EmailSendError);
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
