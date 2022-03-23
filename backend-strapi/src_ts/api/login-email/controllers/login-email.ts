"use strict";

import { e, t } from "shared";
import { entities } from "../../../utils";

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;

module.exports = {
    /**
     * La funzione controlla se esiste un utente con quella mail
     * restituisce email e username in caso positivo
     */
    async index(ctx: any): Promise<e.LoginEmailRes> {
        // Prendiamo il body della richiesta
        const body: e.LoginEmailReq = ctx.request.body;

        // Validiamo il body
        try {
            await e.LoginEmailSchema.validate(body);
        } catch (err) {
            throw new ApplicationError(e.LoginEmailErrors.badRequest);
        }

        // Cerchiamo l'utente
        const users: Array<t.UsersPermissionsUser> =
            await strapi.entityService.findMany(entities.user, {
                filters: body,
                populate: {
                    userInfo: true,
                },
            });

        // Se c'è un risultato ritorniamo utente con username e email
        if (users.length == 1) {
            const user = users[0];
            const userInfo = user.userInfo as t.UserInfo;
            return { email: user.email, name: userInfo.name as string };
        }
        // Altrimenti, 404
        else {
            throw new ApplicationError(e.LoginEmailErrors.notFound);
        }
    },
};
