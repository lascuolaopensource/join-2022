"use strict";

import { f, t } from "shared";

module.exports = {
    /**
     * La funzione controlla se esiste un utente con quella mail
     * restituisce email e username in caso positivo
     */
    async index(ctx: any): Promise<f.loginEmail.leResponse | void> {
        // Prendiamo il body della richiesta
        const body: f.loginEmail.leBody = ctx.request.body;

        // Validiamo il body
        try {
            await f.loginEmail.leSchema.validate(body);
        } catch (e) {
            ctx.badRequest(f.loginEmail.leErrors.badRequest);
        }

        // Cerchiamo l'utente
        const users: Array<t.UsersPermissionsUser> =
            await strapi.entityService.findMany(
                "plugin::users-permissions.user",
                {
                    filters: body,
                }
            );

        // Se c'è un risultato ritorniamo utente con username e email
        if (users.length == 1) {
            const user = users[0];
            return { email: user.email, username: user.username };
        }
        // Altrimenti, 404
        else {
            ctx.notFound(f.loginEmail.leErrors.notFound);
        }
    },
};
