"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    const policy = "user-exists";
    strapi.log.info(`In ${policy} policy`);
    const user = policyContext.state.user;
    if (user) {
        return true;
    }
    else {
        throw new PolicyError(shared_1.Errors.UserNotFound);
    }
};
