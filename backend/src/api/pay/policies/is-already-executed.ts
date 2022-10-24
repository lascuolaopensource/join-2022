import { entities as e, CTX, getPaymentByUID } from "../../../utils";
import { errors as err, routes as r, types as t } from "join-shared";

import { Strapi } from "@strapi/strapi";
import { errors } from "@strapi/utils";
const { PolicyError } = errors;

//

export default async function (
    policyContext: CTX<r.Pay.Execute.Req>,
    config: any,
    { strapi }: { strapi: Strapi }
) {
    const policyName = "is-already-executed";
    strapi.log.info(`POLICY - ${policyName}`);

    // Getting data
    const body = policyContext.request.body;

    // Getting payment
    const payment: t.Payment = await getPaymentByUID(body.paymentId);

    // Check if its deadline is not passed yet
    if (payment.executed) {
        throw new PolicyError(err.paymentAlreadyExecuted, { policyName });
    }

    return true;
}
