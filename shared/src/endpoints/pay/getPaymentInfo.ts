import { Payment, PaymentDetails, PaymentBillingInfo } from "../../types";

export interface Res {
	payment: Payment;
	details: PaymentDetails;
	billing: PaymentBillingInfo | null;
}
