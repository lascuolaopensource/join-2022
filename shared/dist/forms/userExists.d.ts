import * as yup from "yup";
/**
 * User Exists
 */
export declare type ueParam = "email" | "username";
export declare type ueBody = Record<ueParam, string>;
export declare const ueSchema: import("yup/lib/object").OptionalObjectSchema<{
    email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    username: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    username: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type ueResponse = {
    exists: boolean;
};
