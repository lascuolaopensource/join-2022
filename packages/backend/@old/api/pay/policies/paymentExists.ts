import { Errors } from "shared";
import { getPaymentByHash } from "../../../utils";

const utils = require("@strapi/utils");
const { PolicyError } = utils.errors;

module.exports = async (policyContext: any, config: any, { strapi }: any) => {
    strapi.log.info("In exists policy");

    try {
        await getPaymentByHash(policyContext.params.hash);
    } catch (e) {
        throw new PolicyError(Errors.PaymentNotFound, {
            policy: "paymentExists",
        });
    }

    return true;
};
