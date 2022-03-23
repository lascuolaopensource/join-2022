"use strict";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

import { e } from "shared";
import { getUserByEmail } from "../../../utils";

/**
 * `isPayloadValid` policy.
 */

module.exports = async (
    policyContext: any,
    config: any,
    { strapi }: any
): Promise<boolean> => {
    strapi.log.info("In userExists policy.");

    // Getting body
    const body: e.EnrollReq = policyContext.request.body;

    // If the request is not authenticated
    if (!policyContext.state.user) {
        // We check if a user with the sent email already exists
        const email = body.contacts.user.email;
        const user = await getUserByEmail(email);

        if (user) {
            throw new PolicyError("userExists", {
                policy: "userExists",
            });
        }
    }

    return true;
};
