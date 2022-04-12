"use strict";

import { endpoints as e, Errors } from "shared";
import { entities } from "../../../utils";

/**
 * A set of functions called "actions" for `userExists`
 */

module.exports = {
    /**
     * Questa funzione controlla se esiste un utente
     * con "username" o "password" corrispondente
     */
    async index(ctx: any): Promise<e.UserExistsRes> {
        // Prendiamo il body della richiesta:
        const body: e.UserExistsReq = ctx.request.body;

        // Ricerca utente
        const user = await strapi.query(entities.user).findOne({
            where: body,
        });

        return { exists: user ? true : false };
    },
};
