"use strict";

import { f } from "shared";

/**
 * `isPayloadValid` policy.
 */

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    // Add your own logic here.
    strapi.log.info("In isPayloadValid policy.");

    try {
        await f.enroll.enSchema.validate(policyContext.request.body);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
