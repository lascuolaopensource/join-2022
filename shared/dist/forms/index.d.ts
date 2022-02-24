import * as yup from "yup";
/**
 * Util
 */
/**
 * User
 */
export declare const userVal: import("yup/lib/object").OptionalObjectSchema<{
    exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    data: import("yup/lib/object").OptionalObjectSchema<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
    data: import("yup/lib/object").OptionalObjectSchema<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    }>>;
}>>;
export interface FUser {
    exists: boolean;
    data: {
        email: string;
        name: string;
        surname: string;
    };
}
/**
 * Phone
 */
export declare const phoneVal: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
/**
 * Evaluation
 */
export declare const evaluationVal: import("yup/lib/object").OptionalObjectSchema<{
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
export interface FEvaluation {
    letterNeeded: boolean;
    letter: string;
    portfolioNeeded: boolean;
    portfolio: string;
    cvNeeded: boolean;
    cv: string;
}
/**
 * Address
 */
export declare const addressVal: import("yup/lib/object").OptionalObjectSchema<{
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
export interface FAddress {
    cap: string;
    town: string;
    province: string;
    street: string;
}
/**
 * Billing
 */
export declare const billingOptions: readonly ["me", "person", "company"];
declare type BillingOptions = typeof billingOptions[number];
export declare const billingVal: import("yup/lib/object").OptionalObjectSchema<{
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
export interface FBilling {
    billingOption: BillingOptions;
    me: {
        cf: string;
    };
    person: {
        name: string;
        surname: string;
        cf: string;
    };
    company: {
        name: string;
        vat: string;
        sdi: string;
    };
    email: string;
    address: FAddress;
}
/**
 * Enrollment
 */
export declare const enrollVal: import("yup/lib/object").RequiredObjectSchema<{
    courseId: import("yup/lib/number").RequiredNumberSchema<number, import("yup/lib/types").AnyObject>;
    user: import("yup/lib/object").RequiredObjectSchema<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        data: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        data: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }>>;
    phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    user: import("yup/lib/object").RequiredObjectSchema<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        data: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        exists: import("yup/lib/boolean").RequiredBooleanSchema<boolean, import("yup/lib/types").AnyObject>;
        data: import("yup/lib/object").OptionalObjectSchema<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
            email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
            surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        }>>;
    }>>;
    phone: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
export interface FEnroll {
    courseId: number;
    user: FUser;
    phone: string;
    evaluationNeeded: boolean;
    evaluation: FEvaluation;
    billingNeeded: boolean;
    billing: FBilling;
}
export * as loginEmail from "./loginEmail";
export * as loginPassword from "./loginPassword";
export * as userExists from "./userExists";
