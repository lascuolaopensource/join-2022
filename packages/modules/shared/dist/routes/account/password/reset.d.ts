import { HTTPMethod, UsersPermissionsMe } from "../../../types";
export declare const path = "/auth/reset-password";
export declare const method = HTTPMethod.POST;
export type Req = {
    password: string;
    passwordConfirmation: string;
    code: string;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").RequiredObjectSchema<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    passwordConfirmation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    code: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    passwordConfirmation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    code: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export interface Res {
    user: UsersPermissionsMe;
    jwt: string;
}
export declare function send(data: Req, fetchImpl?: typeof fetch): Promise<import("../../../join-request").Res<Res>>;
