import { LoginResponse } from "../types";
/**
 * Login
 */
export declare const LoginValues: {
    identifier: string;
    password: string;
};
export declare const LoginSchema: import("yup/lib/object").OptionalObjectSchema<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type LoginReq = typeof LoginValues;
export declare type LoginRes = LoginResponse;
