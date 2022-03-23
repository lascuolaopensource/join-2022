export declare type UserExistsReq = {
    email: string;
};
export declare type UserExistsRes = {
    exists: boolean;
};
export declare const UserExistsSchema: import("yup/lib/object").OptionalObjectSchema<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
