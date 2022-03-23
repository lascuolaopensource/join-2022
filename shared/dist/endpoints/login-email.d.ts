/**
 * LoginEmail
 */
export declare type LoginEmailReq = {
    email: string;
};
export declare type LoginEmailRes = {
    email: string;
    name: string;
};
export declare const LoginEmailValues: {
    email: string;
};
export declare const LoginEmailSchema: import("yup/lib/object").OptionalObjectSchema<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare const enum LoginEmailErrors {
    notFound = "leNotFound",
    badRequest = "leBadRequest"
}
