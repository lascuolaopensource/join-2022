"use strict";

/**
 * Imports
 */

import { endpoints as e, Errors, types as t } from "shared";
import {
    getUserPemissionsSettings,
    getService,
    registerUser,
    registerUserErrorHandler,
} from "../../../utils";

const utils = require("@strapi/utils");
const { sanitize } = utils;

/**
 * Helpers
 */

function sanitizeUser(user: any, ctx: any) {
    // Copied from
    // /node_modules/@strapi/plugin-users-permissions/server/controllers/auth.js
    const { auth } = ctx.state;
    const userSchema = strapi.getModel("plugin::users-permissions.user");
    return sanitize.contentAPI.output(user, userSchema, { auth });
}

/**
 * A set of functions called "actions" for `register-user`
 */

module.exports = {
    index: async (ctx: any, next: any) => {
        strapi.log.info("In register-user controller");

        /**
         * Getting
         */

        // Getting body
        const body: e.RegisterUserReq = ctx.request.body;

        // Getting user-permissions settings
        const settings = await getUserPemissionsSettings();

        /**
         * Disabling registration if settings
         */

        if (!settings.allow_register) {
            return ctx.forbidden(Errors.RegisterDisabled);
        }

        /**
         * Creating
         */

        // Creating user
        let user = {} as t.ID<t.UsersPermissionsUser>;
        try {
            user = await registerUser(body);
        } catch (e) {
            return registerUserErrorHandler(e, ctx);
        }

        // Rimuovere informazioni sensibili dall'utente
        // (come la password) per restituirle
        const sanitizedUser = await sanitizeUser(user, ctx);

        /**
         * Email confirmation + Returning
         */

        // Se l'email di conferma è attiva, si restituisce l'utente
        if (settings.email_confirmation) {
            try {
                await getService("user").sendConfirmationEmail(sanitizedUser);
            } catch (e) {
                console.log(e);
                return ctx.internalServerError(Errors.EmailSendError);
            }
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
