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
            ...ctx.request.body,
            provider: "local",
        };
        userParams.email = userParams.email.toLowerCase();
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
        const user = await strapi
            .query("plugin::users-permissions.user")
            .create({ data: userParams });
        const newUserInfoData = {
            name: userParams.name,
            surname: userParams.surname,
            owner: user.id,
        };
        const newUserInfo = await strapi.entityService.create("api::user-info.user-info", { data: newUserInfoData });
        const sanitizedUser = await sanitizeUser(user, ctx);
        if (settings.email_confirmation) {
            await getService("user").sendConfirmationEmail(sanitizedUser);
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
