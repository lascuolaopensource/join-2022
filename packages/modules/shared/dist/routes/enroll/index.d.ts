import { Contacts, Evaluation } from "../components";
import { HTTPMethod, Shape } from "../../types";
export declare const path: (id?: string) => string;
export declare const method = HTTPMethod.POST;
export declare type Req = {
    contacts: Contacts.Type;
    evaluation: Evaluation.Type;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Req>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Req>>>;
export declare type Res = {
    paymentUID: string | null;
};
export declare function getSchemaCtx(userExists: boolean, letterNeeded: boolean, portfolioNeeded: boolean, cvNeeded: boolean): ISchemaCtx;
export interface ISchemaCtx extends Contacts.ISchemaCtx, Evaluation.ISchemaCtx {
}
export declare function send(courseID: string, data: Req, token?: any, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
