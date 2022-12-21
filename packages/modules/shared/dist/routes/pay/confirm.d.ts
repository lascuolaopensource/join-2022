import { HTTPMethod, Shape, PaymentCategories } from "../../types";
export declare const path = "/pay/confirm";
export declare const method = HTTPMethod.POST;
export declare type Req = {
    confirmationCode: string;
};
export declare const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
export interface Res {
    category: PaymentCategories;
    id: string;
}
export declare function send(confirmationCode: string, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
