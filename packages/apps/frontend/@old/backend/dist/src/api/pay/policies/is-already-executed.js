"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils");
const join_shared_1 = require("join-shared");
const utils_2 = require("@strapi/utils");
const { PolicyError } = utils_2.errors;
//
async function default_1(policyContext, config, { strapi }) {
    const policyName = "is-already-executed";
    strapi.log.info(`POLICY - ${policyName}`);
    // Getting data
    const body = policyContext.request.body;
    // Getting payment
    const payment = await (0, utils_1.getPaymentByUID)(body.paymentId);
    // Check if its deadline is not passed yet
    if (payment.executed) {
        throw new PolicyError(join_shared_1.errors.paymentAlreadyExecuted, { policyName });
    }
    return true;
}
exports.default = default_1;
