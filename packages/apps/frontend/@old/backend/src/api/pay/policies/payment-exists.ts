import { CTX, getPaymentByUID } from "../../../utils";
import { errors as e, routes as r } from "join-shared";

import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
const { PolicyError } = errors;

//

export default async function (
    policyContext: CTX<r.Pay.Execute.Req>,
    config: any,
    { strapi }: { strapi: Strapi }
) {
    const policyName = "payment-exists";
    strapi.log.info(`POLICY - ${policyName}`);

    // Getting data
    const body = policyContext.request.body;

    // Getting payment
    try {
        await getPaymentByUID(body.paymentId);
    } catch (err) {
        throw new PolicyError(e.paymentNotFound, { policyName });
    }

    return true;
}
