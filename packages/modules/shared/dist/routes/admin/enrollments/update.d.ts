import { HTTPMethod, Enum_Enrollment_State, Shape } from "$types";
export declare namespace Update {
    const path = "/admin-enrollments/update";
    const method = HTTPMethod.POST;
    interface Item {
        id: string;
        state: Enum_Enrollment_State;
    }
    const itemSchema: import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>;
    interface Req {
        changes: Array<Item>;
    }
    const schema: import("yup/lib/object").OptionalObjectSchema<{
        changes: import("yup/lib/array").RequiredArraySchema<import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>[]>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        changes: import("yup/lib/array").RequiredArraySchema<import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>[]>;
    }>>;
    interface Res {
    }
}
