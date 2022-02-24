import * as yup from "yup";
import * as billing from "./billing";
import { thenReq } from "./utils";

/**
 * Payment
 */

export const enSchema = yup.object({
    billingNeeded: yup.boolean().required(),
    billing: billing.bSchema.when("billingNeeded", thenReq(true)),
});

export interface enType {
    billingNeeded: boolean;
    billing: billing.bType;
}
