import * as yup from "yup";
import { Errors as E, endpoints as e } from "shared";
import { policies as p } from "../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (
    policyContext: any,
    config: p.IsBodyValidConfig,
    { strapi }: any
) => {
    const policy = "is-body-valid";
    strapi.log.info(`In ${policy} policy`);

    // Getting validator
    const schema = config.schema;

    // Throwing error if no schema
    if (!schema) {
        throw new PolicyError(E.NoSchemaProvidedInPolicyConfig, { policy });
    }

    // Getting body
    const body = policyContext.request.body;

    // Validating body
    try {
        await schema.validate(body);
    } catch (e) {
        throw new PolicyError(E.InvalidRequestBody, { policy });
    }

    return true;
};
