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
  async check(ctx) {
    // Prendiamo il body della richiesta
    const body = ctx.request.body;

    // Se l'oggetto NON:
    // - ha solo una chiave
    // - la chiave è "email" o "username"
    if (
      !(
        Object.keys(body).length == 1 &&
        ("email" in body || "username" in body)
      )
    ) {
      ctx.throw(400);
    }

    // Searching for a user with that props
    // https://forum.strapi.io/t/get-only-some-fields/9000/5
    const user = await strapi.query("user", "users-permissions").findOne(body);

    // We return accordingly
    return { exists: user ? true : false };
  },
};
