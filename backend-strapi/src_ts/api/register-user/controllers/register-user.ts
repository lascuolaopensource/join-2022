"use strict";

/**
 * Imports
 */

import { t } from "shared";

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { sanitize } = utils;

/**
 * Helpers
 */

function getService(name: string) {
    return strapi.plugin("users-permissions").service(name);
}

function sanitizeUser(user: any, ctx: any) {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel("plugin::users-permissions.user");

    return sanitize.contentAPI.output(user, userSchema, { auth });
}

/**
 * A set of functions called "actions" for `register-user`
 */

module.exports = {
    index: async (ctx: any, next: any) => {
        /**
         * Getting registration settings
         */

        const pluginStore = await strapi.store({
            type: "plugin",
            name: "users-permissions",
        });

        const settings = await pluginStore.get({
            key: "advanced",
        });

        /**
         * Disabling registration if settings
         */

        if (!settings.allow_register) {
            throw new ApplicationError("Register action is currently disabled");
        }

        /**
         * Creating user params
         */

        // Adding 'local' provider
        const userParams = {
            ...ctx.request.body,
            provider: "local",
        };

        // Making email lowercase
        userParams.email = userParams.email.toLowerCase();

        // Hashing password
        userParams.password = await getService("user").hashPassword(userParams);

        // Adding role
        const role = await strapi
            .query("plugin::users-permissions.role")
            .findOne({ where: { type: settings.default_role } });

        if (!role) {
            throw new ApplicationError("Impossible to find the default role");
        }

        userParams.role = role.id;

        /**
         * Creating user
         */

        // L'utente è già confermato se l'email di conferma non è attiva
        if (!settings.email_confirmation) {
            userParams.confirmed = true;
        }

        // Creating user
        const user = await strapi
            .query("plugin::users-permissions.user")
            .create({ data: userParams });

        // Creating userInfo
        const newUserInfoData: t.UserInfoInput = {
            name: userParams.name,
            surname: userParams.surname,
            owner: user.id,
        };
        const newUserInfo: t.UserInfo = await strapi.entityService.create(
            "api::user-info.user-info",
            { data: newUserInfoData }
        );

        // Rimuovere informazioni sensibili dall'utente
        // (come la password) per restituirle
        const sanitizedUser = await sanitizeUser(user, ctx);

        // Invio della mail di conferma e si restituisce l'utente
        if (settings.email_confirmation) {
            await getService("user").sendConfirmationEmail(sanitizedUser);
            return ctx.send({ user: sanitizedUser });
        }
        // Altrimenti, si restituisce anche il token JSON
        else {
            const jwt = getService("jwt").issue(user.id);
            return ctx.send({
                jwt,
                user: sanitizedUser,
            });
        }
    },
};
