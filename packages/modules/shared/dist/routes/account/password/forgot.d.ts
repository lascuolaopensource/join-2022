import { HTTPMethod } from "../../../types";
export declare const path = "/auth/forgot-password";
export declare const method = HTTPMethod.POST;
export declare type Req = {
    email: string;
};
export declare const values: Req;
export declare const schema: import("yup/lib/object").RequiredObjectSchema<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export interface Res {
    ok: boolean;
}
export declare function send(data: Req, fetchImpl?: typeof fetch): Promise<import("../../../join-request").Res<Res>>;
