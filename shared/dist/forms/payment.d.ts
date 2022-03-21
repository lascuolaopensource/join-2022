import * as yup from "yup";
import * as billing from "./billing";
/**
 * Payment
 */
export declare const pSchema: import("yup/lib/object").OptionalObjectSchema<{
    paymentHash: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    billing: import("yup/lib/object").RequiredObjectSchema<{
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
    paymentHash: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    billing: import("yup/lib/object").RequiredObjectSchema<{
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
export interface pType {
    paymentHash: string;
    billing: billing.bType;
}
export interface pResType {
    sessionUrl: string | null;
}
/**
 * Payment confirmation
 */
export declare const pConfirmSchema: import("yup/lib/object").OptionalObjectSchema<{
    confirmCode: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    confirmCode: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
}>>;
export interface pConfirmType {
    confirmCode: string;
}
export interface pConfirmResType {
    confirmed: boolean;
}
