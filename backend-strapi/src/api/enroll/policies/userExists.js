"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
const utils_1 = require("../../../utils");
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In userExists policy.");
    const body = policyContext.request.body;
    if (!policyContext.state.user) {
        const email = body.contacts.user.email;
        const user = await (0, utils_1.getUserByEmail)(email);
        if (user) {
            throw new PolicyError("userExists", {
                policy: "userExists",
            });
        }
    }
    return true;
};
