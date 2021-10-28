"use strict";

/**
 * A set of functions called "actions" for `username`
 */

module.exports = {
  async check(ctx) {
    // This variable keeps track if the user exists
    let exists = false;

    // Getting the username from params
    const { username } = ctx.params;

    // Searching for a user with that username
    // https://forum.strapi.io/t/get-only-some-fields/9000/5
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ username });

    // If the user exists then we update the variable
    if (user) {
      exists = true;
    }

    return { exists };
  },
};
