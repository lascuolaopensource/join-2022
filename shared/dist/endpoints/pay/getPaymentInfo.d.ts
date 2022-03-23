import { Payment, PaymentDetails, PaymentBillingInfo } from "../../types";
export interface GetPaymentInfoRes {
    payment: Payment;
    details: PaymentDetails;
    billing: PaymentBillingInfo | null;
}
