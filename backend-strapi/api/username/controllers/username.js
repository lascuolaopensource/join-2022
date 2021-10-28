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
