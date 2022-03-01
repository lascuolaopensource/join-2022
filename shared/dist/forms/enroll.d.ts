import * as yup from "yup";
import * as contacts from "./contacts";
import * as evaluation from "./evaluation";
/**
 * Enrollment form
 */
export declare const enValues: {
    courseId: string;
    contacts: {
        exists: boolean;
        user: {
            email: string;
            name: string;
            surname: string;
        };
        phone: string;
    };
    evaluation: {
        letterNeeded: boolean;
        letter: string;
        portfolioNeeded: boolean;
        portfolio: string;
        cvNeeded: boolean;
        cv: string;
    };
};
export declare const enSchema: import("yup/lib/object").OptionalObjectSchema<{
    courseId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contacts: import("yup/lib/object").OptionalObjectSchema<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        user: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        user: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    evaluation: import("yup/lib/object").OptionalObjectSchema<{
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
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    courseId: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    contacts: import("yup/lib/object").OptionalObjectSchema<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        user: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        user: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
    evaluation: import("yup/lib/object").OptionalObjectSchema<{
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
}>>;
export interface enRequest {
    courseId: string;
    contacts: contacts.cType;
    evaluation: evaluation.evType;
}
export interface enResponse {
    paymentId: string | null;
}
