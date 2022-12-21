import { Billing, Address } from "../components";
import { HTTPMethod, Shape } from "../../types";
export declare type Params = {
    id: string;
};
export declare const path: (params?: Params) => string;
export declare const method = HTTPMethod.POST;
export declare type Req = {
    billingOption: Billing.Option;
    owner: Billing.Owner.Type | null;
    person: Billing.Person.Type | null;
    company: Billing.Company.Type | null;
    address: Address.Type;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
export interface Res {
    sessionUrl: string | null;
}
export declare function send(paymentID: string, data: Req, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
