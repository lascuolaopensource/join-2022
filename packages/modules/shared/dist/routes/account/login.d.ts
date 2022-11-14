import { HTTPMethod, UsersPermissionsMe } from "../../types";
export declare namespace Login {
    const path = "/auth/local";
    const method = HTTPMethod.POST;
    interface Req {
        identifier: string;
        password: string;
    }
    const values: Req;
    const schema: import("yup/lib/object").RequiredObjectSchema<{
        identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        identifier: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        password: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    interface Res {
        user: UsersPermissionsMe;
        jwt: string;
    }
}
