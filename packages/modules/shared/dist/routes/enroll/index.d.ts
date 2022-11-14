import { Contacts, Evaluation } from "../utils";
import { HTTPMethod, Shape } from "../../types";
export declare namespace Enroll {
    const path = "/enroll";
    const method = HTTPMethod.POST;
    interface Req {
        courseId: string;
        contacts: Contacts.Type;
        evaluation: Evaluation.Type;
    }
    const values: Req;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
    type Res = {
        paymentUID: string | null;
    };
    function getSchemaCtx(userExists: boolean, letterNeeded: boolean, portfolioNeeded: boolean, cvNeeded: boolean): ISchemaCtx;
    interface ISchemaCtx extends Contacts.ISchemaCtx, Evaluation.ISchemaCtx {
    }
}
