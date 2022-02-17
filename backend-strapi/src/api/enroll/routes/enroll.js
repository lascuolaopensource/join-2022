"use strict";

/**
 * A set of functions called "actions" for `userExists`
 */

module.exports = {
    /**
     * This function checks if a user with some props exists
     * The props have to match the user's fields,
     * otherwise you get a 'Bad Request' error
     */
    async index(ctx) {
        // Prendiamo il body della richiesta, che deve essere di tipo {email: "email"}
        const body = ctx.request.body;

        console.log(body);
    },
};
