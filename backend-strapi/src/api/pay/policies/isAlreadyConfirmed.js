"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isAlreadyConfirmed policy");
    const hash = policyContext.params.hash;
    const payment = await (0, utils_1.getPaymentByHash)(hash);
    if (payment.payment.confirmed) {
        throw new PolicyError("paymentAlreadyConfirmed", {
            policy: "isAlreadyConfirmed",
        });
    }
    return true;
};
