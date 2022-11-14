import * as yup from "yup";
export declare namespace Schemas {
    /**
     * Basic schemas
     */
    const url: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const vat: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const phone: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const pec: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const provincia: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    const cap: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    /**
     * Yup dynamic checks
     */
    function thenReq(value: boolean | string): {
        is: string | boolean;
        then: (schema: yup.AnySchema) => any;
        otherwise: (schema: yup.AnySchema) => any;
    };
    function thenUrlReq(value: boolean | string): {
        is: string | boolean;
        then: (schema: yup.AnySchema) => import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        otherwise: (schema: yup.AnySchema) => any;
    };
    function thenNull(value: boolean | string): {
        is: string | boolean;
        then: (schema: yup.AnySchema) => any;
        otherwise: (schema: yup.AnySchema) => any;
    };
    const nullOrReq: {
        is: (v: string | boolean | number) => boolean;
        then: (s: yup.AnySchema) => any;
        otherwise: (s: yup.AnySchema) => any;
    };
}
