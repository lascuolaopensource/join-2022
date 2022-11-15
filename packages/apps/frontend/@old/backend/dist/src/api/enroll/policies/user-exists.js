"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const join_shared_1 = require("join-shared");
const utils_2 = require("@strapi/utils");
const { PolicyError } = utils_2.errors;
//
async function default_1(policyContext, config, { strapi }) {
    const policyName = "user-exists";
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting data
    const user = policyContext.state.user;
    const body = policyContext.request.body;
    // If user is logged, it's fine
    if (user) {
        return true;
    }
    // If no user, then we have to check if the email doesn't exist already
    else {
        const email = body.contacts.email;
        // Search for user
        const users = await (0, utils_1.getUserByEmail)(email);
        // If user exists, then it's bad request
        if (users.length > 0) {
            throw new PolicyError(join_shared_1.errors.emailAlreadyExisting, { policyName });
        }
        // Otherwise it's good
        return true;
    }
}
exports.default = default_1;
