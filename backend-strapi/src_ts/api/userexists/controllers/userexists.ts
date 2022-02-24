"use strict";

import { f, t } from "shared";

/**
 * A set of functions called "actions" for `userExists`
 */

module.exports = {
    /**
     * Questa funzione controlla se esiste un utente
     * con "username" o "password" corrispondente
     */
    async index(ctx: any): Promise<f.userExists.ueResponse> {
        // Prendiamo il body della richiesta:
        const body: f.userExists.ueBody = ctx.request.body;

        // Validiamo il body
        try {
            await f.userExists.ueSchema.validate(body);
        } catch (e) {
            ctx.badRequest();
        }

        // Quindi si cerca per un utente con quella mail o quell'username
        // Cerchiamo l'utente
        const users: Array<t.UsersPermissionsUser> =
            await strapi.entityService.findMany(
                "plugin::users-permissions.user",
                {
                    filters: body,
                }
            );

        // Se la lista ha lunghezza allora un utente esiste
        return { exists: users.length ? true : false };
    },
};
