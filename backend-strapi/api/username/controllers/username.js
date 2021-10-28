"use strict";

/**
 * A set of functions called "actions" for `username`
 */

module.exports = {
  async check(ctx) {
    const { username } = ctx.params;
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ username });
    let exists = false;
    if (user) {
      exists = true;
    }
    return { exists };
  },
};
