import { HTTPMethod, UsersPermissionsLoginPayload } from "../../types";
export declare const path = "/account/register";
export declare const method = HTTPMethod.POST;
export type Req = {
    name: string;
    surname: string;
    email: string;
    password: string;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").RequiredObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export interface Res extends UsersPermissionsLoginPayload {
}
export declare function send(data: Req, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
