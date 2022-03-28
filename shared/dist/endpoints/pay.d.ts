import * as yup from "yup";
import { BillingOptions } from "../types";
/**
 * Address
 */
export declare const AddressValues: {
    cap: string;
    town: string;
    street: string;
    province: string;
};
export declare const AddressSchema: import("yup/lib/object").OptionalObjectSchema<{
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
export declare type Address = typeof AddressValues;
/**
 * Billing data
 */
export declare const BillingMeValues: {
    cf: string;
    address: {
        cap: string;
        town: string;
        street: string;
        province: string;
    };
};
export declare const BillingMeSchema: import("yup/lib/object").OptionalObjectSchema<{
    cf: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    cf: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
export declare type BillingMe = typeof BillingMeValues;
export declare const BillingPersonValues: {
    name: string;
    surname: string;
    cf: string;
    email: string;
    address: {
        cap: string;
        town: string;
        street: string;
        province: string;
    };
};
export declare const BillingPersonSchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    cf: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    cf: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    email: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
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
export declare type BillingPerson = typeof BillingPersonValues;
export declare const BillingCompanyValues: {
    name: string;
    vat: string;
    sdi: string;
    pec: string;
    address: {
        cap: string;
        town: string;
        street: string;
        province: string;
    };
};
export declare const BillingCompanySchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    pec: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    address: import("yup/lib/object").OptionalObjectSchema<{
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
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    pec: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    address: import("yup/lib/object").OptionalObjectSchema<{
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
export declare type BillingCompany = typeof BillingCompanyValues;
/**
 * Payment endpoint
 */
export declare type PayReq = {
    billingOption: BillingOptions;
    me: BillingMe;
    person: BillingPerson;
    company: BillingCompany;
};
export declare type PayRes = {
    sessionUrl: string | null;
};
export declare const PayValues: PayReq;
export declare const PaySchema: import("yup/lib/object").OptionalObjectSchema<{
    billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    me: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
    person: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
    company: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    billingOption: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    me: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
    person: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
    company: import("yup/lib/object").OptionalObjectSchema<import("yup/lib/object").ObjectShape, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<import("yup/lib/object").ObjectShape>>;
}>>;
