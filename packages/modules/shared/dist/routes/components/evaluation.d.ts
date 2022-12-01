import { Shape } from "../../types";
export declare namespace Evaluation {
    interface Type {
        letter: string;
        portfolio: string;
        cv: string;
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
    interface ISchemaCtx {
        letterNeeded: boolean;
        portfolioNeeded: boolean;
        cvNeeded: boolean;
    }
    function getSchemaCtx(letterNeeded: boolean, portfolioNeeded: boolean, cvNeeded: boolean): ISchemaCtx;
}
