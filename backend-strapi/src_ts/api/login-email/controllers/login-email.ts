"use strict";

import { e, t } from "shared";
import { entities, getUserByEmail, getUserInfo } from "../../../utils";

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
        const user = await getUserByEmail(body.email);

        // Se c'è un risultato ritorniamo utente con username e email
        if (user) {
            const userInfo = await getUserInfo(user.id);
            return { email: user.email, name: userInfo.name as string };
        }
        // Altrimenti, 404
        else {
            throw new ApplicationError(e.LoginEmailErrors.notFound);
        }
    },
};
