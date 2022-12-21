import { Shape } from "../../types";
export interface Type {
    email: string;
    name: string;
    surname: string;
    phone: string;
}
export declare const values: Type;
export declare const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
export interface ISchemaCtx {
    userExists: boolean;
}
export declare function getSchemaCtx(userExists: boolean): ISchemaCtx;
