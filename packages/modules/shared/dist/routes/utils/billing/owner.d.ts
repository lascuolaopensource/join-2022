import { ComponentBillingOwner, CleanComp, Shape } from "$types";
export declare namespace Owner {
    interface Type extends CleanComp<ComponentBillingOwner> {
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
}
