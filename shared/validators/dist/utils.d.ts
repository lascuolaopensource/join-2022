import * as yup from "yup";
export declare const re: {
    url: RegExp;
    cf: RegExp;
};
export declare function thenReq(value: boolean | string): {
    is: string | boolean;
    then: (schema: yup.AnySchema) => any;
    otherwise: (schema: yup.AnySchema) => any;
};
