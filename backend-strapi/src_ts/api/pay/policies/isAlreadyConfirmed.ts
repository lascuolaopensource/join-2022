import { getPaymentByHash } from "../../../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isAlreadyConfirmed policy");

    // Getting hash
    const hash = policyContext.params.hash;

    // Getting payments
    const payment = await getPaymentByHash(hash);

    if (payment.payment.confirmed) {
        throw new PolicyError("paymentAlreadyConfirmed", {
            policy: "isAlreadyConfirmed",
        });
    }

    return true;
};
