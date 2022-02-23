"use strict";
const { validators } = require("shared");

/**
 * `isPayloadValid` policy.
 */

module.exports = async (policyContext, config, { strapi }) => {
    // Add your own logic here.
    strapi.log.info("In isPayloadValid policy.");

    try {
        await validators.enrollVal.validate(policyContext.request.body);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
