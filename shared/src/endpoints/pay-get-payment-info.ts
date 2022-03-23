import { Payment, PaymentDetails, PaymentBillingInfo } from "../types";

export type PayGetPaymentInfoRes = {
	payment: Payment;
	details: PaymentDetails;
	billing: PaymentBillingInfo | null;
};
