import { Errors } from "shared";
import { getPaymentByHash } from "../../../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In isAlreadyPaid policy");

    // Getting payments
    const payment = await getPaymentByHash(policyContext.params.hash);

    if (payment.confirmed) {
        throw new PolicyError(Errors.PaymentAlreadyPaid, {
            policy: "isAlreadyPaid",
        });
    }

    return true;
};
