"use strict";

import { endpoints as e, Errors } from "shared";
import { getUserByEmail, getUserInfo } from "../../../utils";

module.exports = {
    /**
     * La funzione controlla se esiste un utente con quella mail
     * restituisce email e username in caso positivo
     */
    async index(ctx: any): Promise<e.LoginEmailRes> {
        // Prendiamo il body della richiesta
        const body: e.LoginEmailReq = ctx.request.body;

        // Portiamo l'email in lowercase,
        // visto che alla creazione dell'utente viene messa così
        const email = body.email.toLowerCase();

        // Cerchiamo l'utente
        const user = await getUserByEmail(email);

        // Se c'è un risultato ritorniamo utente con username e email
        if (user) {
            // Verifichiamo se l'utente è confermato
            if (!user.confirmed) {
                return ctx.unauthorized(Errors.UserNotConfirmed);
            }

            // Prendiamo anche userinfo per restituire il nome
            const userInfo = await getUserInfo(user.id);

            // Si lancia un errore se userinfo non è stato trovaot
            if (!userInfo) {
                return ctx.internalServerError(Errors.MissingUserInfo);
            }

            // Altrimenti si restituisce
            return {
                email: user.email,
                name: userInfo.name as string,
            };
        }
        // Altrimenti, 404
        else {
            return ctx.notFound(Errors.NotFound, { entity: "user" });
        }
    },
};
