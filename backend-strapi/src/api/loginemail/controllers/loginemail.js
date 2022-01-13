"use strict";

/**
 * A set of functions called "actions" for `userExists`
 */

module.exports = {
  /**
   * Questo endpoint, data l'email,
   * ti ridà indietro l'username dell'utente.
   * Serve per il login:
   * all'utente prima viene chiesta la mail,
   * quindi se la mail c'è il programma ti "saluta"
   * usando il tuo username.
   */
  async index(ctx) {
    // Prendiamo il body della richiesta, che deve essere di tipo {email: "email"}
    const body = ctx.request.body;

    // Se l'oggetto NON:
    // - ha solo una chiave
    // - la chiave è "email"
    // Allora si manda un errore
    if (!(Object.keys(body).length == 1 && "email" in body)) {
      ctx.throw(400);
    }

    // Quindi si cerca per un utente con quella mail o quell'username
    // https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/query-engine/single-operations.html#findone
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: body });

    if (user) {
      return { email: user.email, username: user.username };
    } else {
      ctx.throw(404);
    }
  },
};

/**
 * TO REVIEW:
 * Va bene come endpoint?
 */
