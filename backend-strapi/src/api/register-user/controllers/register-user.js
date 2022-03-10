"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { sanitize } = utils;
function getService(name) {
    return strapi.plugin("users-permissions").service(name);
}
function sanitizeUser(user, ctx) {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel("plugin::users-permissions.user");
    return sanitize.contentAPI.output(user, userSchema, { auth });
}
module.exports = {
    index: async (ctx, next) => {
        const body = ctx.request.body;
        const pluginStore = await strapi.store({
            type: "plugin",
            name: "users-permissions",
        });
        const settings = await pluginStore.get({
            key: "advanced",
        });
        if (!settings.allow_register) {
            throw new ApplicationError("Register action is currently disabled");
        }
        const userParams = {
            provider: "local",
            password: body.password,
        };
        userParams.email = body.email.toLowerCase();
        userParams.username = userParams.email;
        const role = await strapi
            .query("plugin::users-permissions.role")
            .findOne({ where: { type: settings.default_role } });
        if (!role) {
            throw new ApplicationError("Impossible to find the default role");
        }
        userParams.role = role.id;
        if (!settings.email_confirmation) {
            userParams.confirmed = true;
        }
        const user = await getService("user").add(userParams);
        const newUserInfoData = {
            name: body.name,
            surname: body.surname,
            owner: user.id,
        };
        const newUserInfo = await strapi.entityService.create("api::user-info.user-info", { data: newUserInfoData });
        const sanitizedUser = await sanitizeUser(user, ctx);
        if (settings.email_confirmation) {
            try {
                await getService("user").sendConfirmationEmail(sanitizedUser);
            }
            catch (e) {
                throw new ApplicationError(e.message);
            }
            return ctx.send({ user: sanitizedUser });
        }
        else {
            const jwt = getService("jwt").issue(user.id);
            return ctx.send({
                jwt,
                user: sanitizedUser,
            });
        }
    },
};
