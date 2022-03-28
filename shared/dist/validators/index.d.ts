import * as yup from "yup";
/**
 * Setting yup default messages
 */
export declare function setYupDefaultMessages(): void;
/**
 * Regex checks
 */
export declare const re: {
    url: RegExp;
    cf: RegExp;
    phone: RegExp;
    provincia: RegExp;
    cap: RegExp;
    piva: RegExp;
};
/**
 * Schemas
 */
export declare const urlSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const cfSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const phoneSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const provinciaSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const capSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
export declare const emailSchema: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
/**
 * Yup dynamic checks
 */
export declare function thenReq(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => any;
    otherwise: (schema: yup.AnySchema) => any;
};
export declare function thenUrlReq(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    otherwise: (schema: yup.AnySchema) => any;
};
export declare function thenNull(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => any;
    otherwise: (schema: yup.AnySchema) => any;
};
export declare const nullOrReq: {
    is: (v: string | boolean | number) => boolean;
    then: (s: yup.AnySchema) => any;
    otherwise: (s: yup.AnySchema) => any;
};
