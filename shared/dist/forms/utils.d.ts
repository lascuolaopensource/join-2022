import * as yup from "yup";
export declare const re: {
    url: RegExp;
    cf: RegExp;
};
export declare const urlSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const cfSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const emailSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare function thenReq(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => any;
    otherwise: (schema: yup.AnySchema) => any;
};
export declare function thenNull(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => any;
    otherwise: (schema: yup.AnySchema) => any;
};
