import { HTTPMethod, UsersPermissionsMe } from "../../../types";
export declare namespace Reset {
    const path = "/auth/reset-password";
    const method = HTTPMethod.POST;
    interface Req {
        password: string;
        passwordConfirmation: string;
        code: string;
    }
    const values: Req;
    const schema: import("yup/lib/object").RequiredObjectSchema<{
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        passwordConfirmation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        code: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        passwordConfirmation: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        code: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    interface Res {
        user: UsersPermissionsMe;
        jwt: string;
    }
}
