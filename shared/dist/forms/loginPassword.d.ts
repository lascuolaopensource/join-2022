/**
 * LoginPassword
 */
export declare const lpValues: {
    password: string;
};
export declare const lpSchema: import("yup/lib/object").OptionalObjectSchema<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export declare type lpType = typeof lpValues;
