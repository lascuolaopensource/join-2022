import * as yup from "yup";
/**
 * Me
 */
export declare const bMeValues: {
    cf: string;
};
export declare const bMeSchema: import("yup/lib/object").OptionalObjectSchema<{
    cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type bMeType = typeof bMeValues;
/**
 * Person
 */
export declare const bPersonValues: {
    name: string;
    surname: string;
    cf: string;
};
export declare const bPersonSchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    surname: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    cf: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type bPersonType = typeof bPersonValues;
/**
 * Company
 */
export declare const bCompanyValues: {
    name: string;
    vat: string;
    sdi: string;
};
export declare const bCompanySchema: import("yup/lib/object").OptionalObjectSchema<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
    name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
    sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
}>>;
export declare type bCompanyType = typeof bCompanyValues;
/**
 * Address
 */
export declare const bAddressValues: {
    cap: string;
    town: string;
    street: string;
    province: string;
};
export declare const bAddressSchema: import("yup/lib/object").OptionalObjectSchema<{
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
export declare type bAddressType = typeof bAddressValues;
/**
 * Billing options
 */
export declare const bOptions: readonly ["me", "person", "company"];
export declare const bOptionsComp: {
    company: string;
    person: string;
    me: string;
};
export declare type bOptionsType = typeof bOptions[number];
/**
 * Billing
 */
export declare const bValues: bType;
export declare const bSchema: import("yup/lib/object").OptionalObjectSchema<{
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
        sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
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
        sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
    }, import("yup/lib/object").AnyObject, import("yup/lib/object").TypeOfShape<{
        name: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        vat: import("yup/lib/string").RequiredStringSchema<string, import("yup/lib/types").AnyObject>;
        sdi: yup.StringSchema<string, import("yup/lib/types").AnyObject, string>;
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
export interface bType {
    billingOption: bOptionsType;
    me: bMeType;
    person: bPersonType;
    company: bCompanyType;
    email: string;
    address: bAddressType;
}
