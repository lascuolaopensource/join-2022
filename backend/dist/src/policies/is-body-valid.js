"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBodyValid = void 0;
const join_shared_1 = require("join-shared");
const utils_1 = require("@strapi/utils");
const { PolicyError } = utils_1.errors;
//
// Policy name, to edit
const policyName = "is-body-valid";
// Function that generates the policy
function isBodyValid(config) {
    return {
        name: `global::${policyName}`,
        config,
    };
}
exports.isBodyValid = isBodyValid;
//
async function default_1(policyContext, config, { strapi }) {
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting validator
    const { schema } = config;
    // Throwing error if no schema
    if (!schema) {
        throw new PolicyError(join_shared_1.errors.policies.noSchemaInConfig, { policyName });
    }
    // Getting body
    const body = policyContext.request.body;
    // Validating body
    try {
        await schema.validate(body, { abortEarly: false });
    }
    catch (err) {
        throw new PolicyError(join_shared_1.errors.policies.bodyNotValid, { policyName });
    }
    return true;
}
exports.default = default_1;
