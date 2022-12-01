import { Billing, Address } from "../utils";
import { HTTPMethod, Shape } from "../../types";
export declare const path: (id?: string) => string;
export declare const method = HTTPMethod.POST;
export declare type Req = {
    billingOption: Billing.Option;
    owner: Billing.Owner.Type;
    person: Billing.Person.Type;
    company: Billing.Company.Type;
    address: Address.Type;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
export interface Res {
    sessionUrl: string | null;
}
