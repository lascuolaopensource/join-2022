import { getPaymentByHash } from "../../../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isExpired policy");

    // Getting payments
    const payment = await getPaymentByHash(policyContext.params.hash);

    if (Date.now() > Date.parse(payment.expiration)) {
        throw new PolicyError("paymentExpired", { policy: "isExpired" });
    }

    return true;
};
