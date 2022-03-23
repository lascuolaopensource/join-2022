import * as yup from "yup";
import { thenReq, thenNull, cfSchema } from "./__utils";
import { BillingOptions } from "../types";

/**
 * Billing data
 */

// Me

export const BillingMeValues = {
	cf: "",
};

export const BillingMeSchema = yup.object({
	cf: cfSchema,
});

export type BillingMe = typeof BillingMeValues;

// Person

export const BillingPersonValues = {
	name: "",
	surname: "",
	cf: "",
};

export const BillingPersonSchema = yup.object({
	name: yup.string().required(),
	surname: yup.string().required(),
	cf: cfSchema,
});

export type BillingPerson = typeof BillingPersonValues;

// Company

export const BillingCompanyValues = {
	name: "",
	vat: "",
	sdi: "",
};

export const BillingCompanySchema = yup.object({
	name: yup.string().required(),
	vat: yup.string().required(),
	sdi: yup.string(),
});

export type BillingCompany = typeof BillingCompanyValues;

/**
 * Address
 */

export const AddressValues = {
	cap: "",
	town: "",
	street: "",
	province: "",
};

export const AddressSchema = yup.object({
	cap: yup.string().required(),
	town: yup.string().required(),
	province: yup.string().required(),
	street: yup.string().required(),
});

export type Address = typeof AddressValues;

/**
 * Payment endpoint
 */

export type PayReq = {
	billingOption: BillingOptions;
	me: BillingMe;
	person: BillingPerson;
	company: BillingCompany;
	email: string;
	address: Address;
};

export type PayRes = {
	sessionUrl: string | null;
};

export const PayValues: PayReq = {
	billingOption: null,
	me: BillingMeValues,
	person: BillingPersonValues,
	company: BillingCompanyValues,
	email: "",
	address: AddressValues,
};

export const PaySchema = yup.object({
	// Modalità
	billingOption: yup
		.string()
		.oneOf(BillingOptions as any)
		.required(),
	//
	me: BillingMeSchema.when("billingOption", thenReq(BillingOptions[0])),
	person: BillingPersonSchema.when(
		"billingOption",
		thenReq(BillingOptions[1])
	),
	company: BillingCompanySchema.when(
		"billingOption",
		thenReq(BillingOptions[2])
	),
	// Generici
	email: yup
		.string()
		.email()
		.when("billingOption", thenNull(BillingOptions[0])),
	address: AddressSchema.required(),
});
