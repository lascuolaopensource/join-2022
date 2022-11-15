import { HTTPMethod, UsersPermissionsMe } from "../../types";
export declare const path = "/auth/local";
export declare const method = HTTPMethod.POST;
export interface Req {
    identifier: string;
    password: string;
}
export declare const values: Req;
export declare const schema: import("yup/lib/object").RequiredObjectSchema<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export interface Res {
    user: UsersPermissionsMe;
    jwt: string;
}
