import { ComponentBillingCompany, CleanComp, Shape } from "$types";
export declare namespace Company {
    interface Type extends CleanComp<ComponentBillingCompany> {
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
}
