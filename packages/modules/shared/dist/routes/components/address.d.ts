import { ComponentSpaceAddress, Shape, CleanComp } from "$types";
export declare namespace Address {
    interface Type extends CleanComp<ComponentSpaceAddress> {
    }
    const values: Type;
    const schema: import("yup/lib/object").OptionalObjectSchema<Shape<Type>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Type>>>;
}
