"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isAlreadyPaid policy");
    const payment = await (0, utils_1.getPaymentByHash)(policyContext.params.hash);
    if (payment.confirmed) {
        throw new PolicyError("paymentAlreadyPaid", {
            policy: "isAlreadyPaid",
        });
    }
    return true;
};
