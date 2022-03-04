"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isPayloadValid policy.");
    try {
        await shared_1.f.enroll.enSchema.validate(policyContext.request.body);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};
