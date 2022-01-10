"use strict";

/**
 * A set of functions called "actions" for `exists`
 */

module.exports = {
  /**
   * This function checks if a user with some props exists
   * The props have to match the user's fields,
   * otherwise you get a 'Bad Request' error
   */
  async checkEmail(ctx) {
    // Prendiamo il body della richiesta
    const body = ctx.request.body;

    // Se il campo email non c'è nella richiesta
    // Si lancia un errore
    if (!("email" in body)) {
      ctx.throw(400);
    }

    // Si cerca per un utente che abbia quella mail
    // https://forum.strapi.io/t/get-only-some-fields/9000/5
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: body.email });

    // Se l'utente esiste, Si restituisce email e username dell'utente
    // Se l'utente non viene trovato, in automatico parte un 404
    if (user) {
      return {
        email: body.email,
        username: user.username,
      };
    }
  },
};
