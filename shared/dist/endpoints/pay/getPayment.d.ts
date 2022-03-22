import * as t from "../../types";
export interface PaymentRelation {
    subject: string;
    price: number;
    type: string;
}
export interface Res {
    payment: t.Payment;
    relation: PaymentRelation;
    billing: {
        address: t.ComponentLocationAddress;
        data: t.Comp<t.BillingInfoDataDynamicZone>;
    } | null;
}
