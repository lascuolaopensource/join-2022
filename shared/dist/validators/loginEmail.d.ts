/**
 * LoginEmail
 */
export declare const LEValues: {
    email: string;
};
export declare const LESchema: import("yup/lib/object").OptionalObjectSchema<
    {
        email: import("yup/lib/string").RequiredStringSchema<
            string,
            import("yup/lib/types").AnyObject
        >;
    },
    import("yup/lib/object").AnyObject,
    import("yup/lib/object").TypeOfShape<{
        email: import("yup/lib/string").RequiredStringSchema<
            string,
            import("yup/lib/types").AnyObject
        >;
    }>
>;
export declare type LEType = typeof LEValues;
export declare type LEResponse = {
    email: string;
    username: string;
};
export declare const enum LEErrors {
    notFound = "LENotFound",
    badRequest = "LEBadRequest",
}
