"use strict";

/**
 * Imports
 */

import { t, f } from "shared";
import {
    getUserPemissionsSettings,
    getService,
    registerUser,
} from "../../../utils";

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;
const { sanitize } = utils;

/**
 * Helpers
 */

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
        strapi.log.info("In register-user controller");

        /**
         * Getting
         */

        // Getting body
        const body: f.register.reType = ctx.request.body;

        // Getting user-permissions settings
        const settings = await getUserPemissionsSettings();

        /**
         * Disabling registration if settings
         */

        if (!settings.allow_register) {
            throw new ApplicationError("Register action is currently disabled");
        }

        /**
         * Creating
         */

        // Creating user
        const user = await registerUser(body);

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
                throw new ApplicationError((e as any).message);
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
