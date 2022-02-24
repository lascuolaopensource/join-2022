import * as yup from "yup";
/**
 * Evaluation
 */
export declare const evValues: {
    letterNeeded: boolean;
    letter: string;
    portfolioNeeded: boolean;
    portfolio: string;
    cvNeeded: boolean;
    cv: string;
};
export declare const evSchema: import("yup/lib/object").OptionalObjectSchema<{
    letterNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    letter: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    portfolioNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    portfolio: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    cvNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    cv: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    letterNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    letter: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    portfolioNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    portfolio: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    cvNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    cv: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type evBody = typeof evValues;
