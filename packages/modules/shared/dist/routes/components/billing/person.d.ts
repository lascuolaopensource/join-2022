import { ComponentBillingPerson, CleanComp, Shape } from "$types";
export declare namespace Person {
    interface Type extends CleanComp<ComponentBillingPerson> {
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
}
