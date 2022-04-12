"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    const policy = "is-admin-enrollments";
    strapi.log.info(`In ${policy} policy`);
    const roleToCheck = config.role;
    if (!roleToCheck) {
        throw new PolicyError(shared_1.Errors.BadPolicyConfig, { policy });
    }
    const user = policyContext.state.user;
    const role = user.role;
    if (role.type == roleToCheck) {
        return true;
    }
    else {
        throw new PolicyError(shared_1.Errors.InvalidRole);
    }
};
