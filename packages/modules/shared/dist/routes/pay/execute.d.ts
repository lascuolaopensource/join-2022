import { Billing, Address } from "../utils";
import { HTTPMethod, Shape } from "$types";
export declare namespace Execute {
    const path = "/pay/execute";
    const method = HTTPMethod.POST;
    interface Req {
        paymentId: string;
        billingOption: Billing.Option;
        owner: Billing.Owner.Type;
        person: Billing.Person.Type;
        company: Billing.Company.Type;
        address: Address.Type;
    }
    const values: Req;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
    interface Res {
        sessionUrl: string | null;
    }
}
