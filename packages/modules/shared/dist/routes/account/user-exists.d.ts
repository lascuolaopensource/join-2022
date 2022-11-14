import { HTTPMethod } from "../../types";
export declare namespace UserExists {
    const path = "/account/user-exists";
    const method = HTTPMethod.POST;
    interface Req {
        email: string;
    }
    const values: Req;
    const schema: import("yup/lib/object").RequiredObjectSchema<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    interface Res {
        exists: boolean;
    }
}
