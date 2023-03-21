import { HTTPMethod, Enum_Enrollment_State, Shape } from "../../../types";
export declare const path = "/admin-enrollments/update";
export declare const method = HTTPMethod.POST;
export interface Item {
    id: string;
    state: Enum_Enrollment_State;
}
export declare const itemSchema: import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>;
export type Req = {
    items: Array<Item>;
};
export declare const schema: import("yup/lib/object").OptionalObjectSchema<{
    items: import("yup/lib/array").RequiredArraySchema<import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>[]>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    items: import("yup/lib/array").RequiredArraySchema<import("yup/lib/object").OptionalObjectSchema<Shape<Item>, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>>, import("yup/lib/types").AnyObject, import("yup/lib/object").TypeOfShape<Shape<Item>>[]>;
}>>;
export interface Res {
}
export declare function send(data: Req, auth: string, fetchImpl?: typeof fetch): Promise<import("../../../join-request").Res<Res>>;
