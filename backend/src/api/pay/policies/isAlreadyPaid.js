"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("shared");
const utils_1 = require("../../../utils");
const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;
module.exports = async (policyContext, config, { strapi }) => {
    strapi.log.info("In isAlreadyPaid policy");
    const payment = await (0, utils_1.getPaymentByHash)(policyContext.params.hash);
    if (payment.confirmed) {
        throw new PolicyError(shared_1.Errors.PaymentAlreadyPaid, {
            policy: "isAlreadyPaid",
        });
    }
    return true;
};
