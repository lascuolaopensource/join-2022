import { Shape } from "../../types";
export declare namespace Contacts {
    interface Type {
        email: string;
        name: string;
        surname: string;
        phone: string;
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
    interface ISchemaCtx {
        userExists: boolean;
    }
    function getSchemaCtx(userExists: boolean): ISchemaCtx;
}
