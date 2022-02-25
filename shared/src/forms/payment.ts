import * as yup from "yup";
import * as billing from "./billing";

/**
 * Payment
 */

export const pSchema = yup.object({
    paymentHash: yup.string(),
    billing: billing.bSchema.required(),
});

export interface pType {
    paymentHash: string | number;
    billing: billing.bType;
}
