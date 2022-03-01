/**
 * LoginEmail
 */
export declare const leValues: {
    email: string;
};
export declare const leSchema: import("yup/lib/object").OptionalObjectSchema<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type leType = typeof leValues;
export declare type leResponse = {
    email: string;
    username: string;
};
export declare const enum leErrors {
    notFound = "leNotFound",
    badRequest = "leBadRequest"
}
