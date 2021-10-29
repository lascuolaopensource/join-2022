"use strict";

/**
 * A set of functions called "actions" for `exists`
 */

module.exports = {
  /**
   * This function checks if the username exists
   * Accepts a body like this:
   * {
   *   field: "email" | "password",
   *   content: string (the email or the password)
   * }
   */
  async check(ctx) {
    // This variable keeps track if the user exists
    let exists = false;

    // Getting the field to search from params
    const body = ctx.request.body;

    /**
     * - Things to check:
     * - Key has to be either 'username' or 'email'
     * - Body "length" has to be 1
     */

    // Getting the key
    const key = Object.keys(body)[0];
    const value = Object.values(body)[0];

    // Creating the object for the query
    const query = {};
    query[key] = value;

    // Searching for a user with that username
    // https://forum.strapi.io/t/get-only-some-fields/9000/5
    const user = await strapi.query("user", "users-permissions").findOne(query);

    // If the user exists then we update the variable
    if (user) {
      exists = true;
    }

    return { exists };
  },
};
