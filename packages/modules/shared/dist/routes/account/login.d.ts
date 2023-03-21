import { UsersPermissionsMe } from "../../types";
import { Request } from "../../request";
export declare const path = "/auth/local";
export declare const method = Request.HTTPMethod.POST;
export declare type Req = {
    identifier: string;
    password: string;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").RequiredObjectSchema<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type Res = {
    user: UsersPermissionsMe;
    jwt: string;
};
export declare function send(data: Req, fetchImpl?: typeof fetch): Promise<import("../../join-request").Res<Res>>;
