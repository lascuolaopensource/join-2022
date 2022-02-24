import * as yup from "yup";
import { thenReq, thenNull, cfSchema } from "./utils";

/**
 * Me
 */

export const bMeValues = {
    cf: "",
};

export const bMeSchema = yup.object({
    cf: cfSchema,
});

export type bMeType = typeof bMeValues;

/**
 * Person
 */

export const bPersonValues = {
    name: "",
    surname: "",
    cf: "",
};

export const bPersonSchema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    cf: cfSchema,
});

export type bPersonType = typeof bPersonValues;

/**
 * Company
 */

export const bCompanyValues = {
    name: "",
    vat: "",
    sdi: "",
};

export const bCompanySchema = yup.object({
    name: yup.string().required(),
    vat: yup.string().required(),
    sdi: yup.string().required(),
});

export type bCompanyType = typeof bCompanyValues;

/**
 * Address
 */

export const bAddressValues = {
    cap: "",
    town: "",
    street: "",
    province: "",
};

export const bAddressSchema = yup.object({
    cap: yup.string().required(),
    town: yup.string().required(),
    province: yup.string().required(),
    street: yup.string().required(),
});

export type bAddressType = typeof bAddressValues;

/**
 * Billing options
 */

export const bOptions = ["me", "person", "company"] as const;

export type bOptionsType = typeof bOptions[number];

/**
 * Billing
 */

export const bValues: bType = {
    billingOption: null,
    me: bMeValues,
    person: bPersonValues,
    company: bCompanyValues,
    email: "",
    address: bAddressValues,
};

export const bSchema = yup.object({
    // Modalità
    billingOption: yup
        .string()
        .oneOf(bOptions as any)
        .required(),
    // Me
    me: bMeSchema.when("billingOption", thenReq(bOptions[0])),
    person: bPersonSchema.when("billingOption", thenReq(bOptions[1])),
    company: bCompanySchema.when("billingOption", thenReq(bOptions[2])),
    // Generici
    email: yup.string().email().when("billingOption", thenNull(bOptions[0])),
    address: bAddressSchema.required(),
});

export interface bType {
    billingOption: bOptionsType;
    me: bMeType;
    person: bPersonType;
    company: bCompanyType;
    email: string;
    address: bAddressType;
}
