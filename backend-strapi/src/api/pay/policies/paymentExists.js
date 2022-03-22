"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In exists policy");
    try {
        await (0, utils_1.getPaymentByHash)(policyContext.params.hash);
    }
    catch (e) {
        throw new PolicyError("paymentNotExisting", {
            policy: "paymentExists",
        });
    }
    return true;
};
