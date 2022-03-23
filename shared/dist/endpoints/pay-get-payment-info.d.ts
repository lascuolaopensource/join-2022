import { Payment, PaymentDetails, PaymentBillingInfo } from "../types";
export declare type PayGetPaymentInfoRes = {
    payment: Payment;
    details: PaymentDetails;
    billing: PaymentBillingInfo | null;
};
