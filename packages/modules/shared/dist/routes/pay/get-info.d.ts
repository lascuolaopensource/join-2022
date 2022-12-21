import { PaymentDetails, HTTPMethod } from "../../types";
export declare type Params = {
    id: string;
};
export declare const path: (params?: Params) => string;
export declare const method = HTTPMethod.GET;
export interface Res extends Omit<PaymentDetails, "owner.email"> {
}
export declare function send(id: string, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
