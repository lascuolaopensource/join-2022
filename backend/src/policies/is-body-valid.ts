import * as yup from "yup";
import { errors as e } from "join-shared";
import { Strapi } from "@strapi/strapi";

import { errors } from "@strapi/utils";
const { PolicyError } = errors;

//

// Policy name, to edit
const policyName = "is-body-valid";

// Policy config types
export type IsBodyValidConfig = {
    schema: yup.AnySchema;
};

// Function that generates the policy
export function isBodyValid(config: IsBodyValidConfig) {
    return {
        name: `global::${policyName}`,
        config,
    };
}

//

export default async function (
    policyContext: any,
    config: IsBodyValidConfig,
    { strapi }: { strapi: Strapi }
) {
    strapi.log.info(`In ${policyName} policy`);

    // Getting validator
    const schema = config.schema;

    // Throwing error if no schema
    if (!schema) {
        throw new PolicyError(e.policies.noSchemaInConfig, { policyName });
    }

    // Getting body
    const body = policyContext.request.body;

    // Validating body
    try {
        await schema.validate(body);
    } catch (err) {
        throw new PolicyError(e.policies.bodyNotValid, { policyName });
    }

    return true;
}
