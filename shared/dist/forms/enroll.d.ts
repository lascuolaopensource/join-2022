import * as yup from "yup";
import * as contacts from "./contacts";
import * as evaluation from "./evaluation";
import * as billing from "./billing";
/**
 * Enrollment form
 */
export declare const enSchema: import("yup/lib/object").OptionalObjectSchema<{
    courseId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
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
    evaluationNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
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
    billingNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    billing: import("yup/lib/object").OptionalObjectSchema<{
        billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        me: import("yup/lib/object").OptionalObjectSchema<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        person: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        company: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        address: import("yup/lib/object").RequiredObjectSchema<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        me: import("yup/lib/object").OptionalObjectSchema<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        person: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        company: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        address: import("yup/lib/object").RequiredObjectSchema<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }>>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    courseId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
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
    evaluationNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
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
    billingNeeded: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    billing: import("yup/lib/object").OptionalObjectSchema<{
        billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        me: import("yup/lib/object").OptionalObjectSchema<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        person: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        company: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        address: import("yup/lib/object").RequiredObjectSchema<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        me: import("yup/lib/object").OptionalObjectSchema<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        person: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        }>>;
        company: import("yup/lib/object").OptionalObjectSchema<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            sdi: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
        email: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
        address: import("yup/lib/object").RequiredObjectSchema<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            cap: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            town: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            province: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            street: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }>>;
}>>;
export interface enType {
    courseId: number;
    contacts: contacts.cType;
    evaluationNeeded: boolean;
    evaluation: evaluation.evType;
    billingNeeded: boolean;
    billing: billing.bType;
}
export interface enResponse {
    paymentId: string;
}
