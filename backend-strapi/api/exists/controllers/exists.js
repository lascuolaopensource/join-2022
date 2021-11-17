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
    // This variable keeps track if the user exists
    let exists = false;

    // Searching for a user with that props
    // https://forum.strapi.io/t/get-only-some-fields/9000/5
    const user = await strapi
      .query("user", "users-permissions")
      .findOne(ctx.request.body);

    // If the user exists then we update the variable
    if (user) {
      exists = true;
    }

    return { exists, username: user.username };
  },
};
