import { HTTPMethod, Shape } from "$types";
export declare namespace Confirm {
    const path = "/pay/confirm";
    const method = HTTPMethod.POST;
    interface Req {
        confirmationCode: string;
    }
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
    interface Res {
        confirmed: boolean;
    }
    interface Pino {
        pino: number;
    }
}
