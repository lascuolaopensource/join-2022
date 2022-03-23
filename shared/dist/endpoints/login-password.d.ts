/**
 * LoginPassword
 */
export declare const LoginPasswordValues: {
    password: string;
};
export declare const LoginPasswordSchema: import("yup/lib/object").OptionalObjectSchema<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type LoginPasswordReq = typeof LoginPasswordValues;
