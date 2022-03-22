import * as yup from "yup";
import * as billing from "./billing";
import { PaymentDetails } from "../types";

/**
 * Payment
 */

export const pSchema = yup.object({
	paymentHash: yup.string(),
	billing: billing.bSchema.required(),
});

export interface pType {
	paymentHash: string;
	billing: billing.bType;
}

export interface pResType {
	sessionUrl: string | null;
}

/**
 * Payment confirmation
 */

export const pConfirmSchema = yup.object({
	confirmCode: yup.string().required(),
});

export interface pConfirmType {
	confirmCode: string;
}

export interface pConfirmResType {
	confirmed: boolean;
	details: PaymentDetails;
}
