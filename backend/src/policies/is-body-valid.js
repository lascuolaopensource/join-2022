"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    const policy = "is-body-valid";
    strapi.log.info(`In ${policy} policy`);
    const schema = config.schema;
    if (!schema) {
        throw new PolicyError(shared_1.Errors.NoSchemaProvidedInPolicyConfig, { policy });
    }
    const body = policyContext.request.body;
    try {
        await schema.validate(body);
    }
    catch (e) {
        throw new PolicyError(shared_1.Errors.InvalidRequestBody, { policy });
    }
    return true;
};
