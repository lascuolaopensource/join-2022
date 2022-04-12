import * as yup from "yup";
import { Errors as E, endpoints as e } from "shared";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    const policy = "isBodyValid";
    strapi.log.info(`In ${policy} policy`);

    // Getting validator
    const schema: yup.AnySchema = config.schema;

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
