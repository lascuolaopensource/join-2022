import * as yup from "yup";
import {
	cfSchema,
	provinciaSchema,
	capSchema,
	setYupDefaultMessages,
	emailSchema,
} from "../validators";
import { BillingOptions } from "../types";

setYupDefaultMessages();

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
	cap: capSchema.required(),
	town: yup.string().required(),
	province: provinciaSchema.required(),
	street: yup.string().required(),
});

export type Address = typeof AddressValues;

/**
 * Billing data
 */

// Me

export const BillingMeValues = {
	cf: "",
	address: AddressValues,
};

export const BillingMeSchema = yup.object({
	cf: cfSchema.required(),
	address: AddressSchema.required(),
});

export type BillingMe = typeof BillingMeValues;

// Person

export const BillingPersonValues = {
	name: "",
	surname: "",
	cf: "",
	email: "",
	address: AddressValues,
};

export const BillingPersonSchema = yup.object({
	name: yup.string().required(),
	surname: yup.string().required(),
	cf: cfSchema.required(),
	email: emailSchema.required(),
	address: AddressSchema.required(),
});

export type BillingPerson = typeof BillingPersonValues;

// Company

export const BillingCompanyValues = {
	name: "",
	vat: "",
	sdi: "",
	pec: "",
	address: AddressValues,
};

export const BillingCompanySchema = yup.object({
	name: yup.string().required(),
	vat: yup.string().required(),
	sdi: yup.string(),
	pec: emailSchema.required(),
	address: AddressSchema,
});

export type BillingCompany = typeof BillingCompanyValues;

/**
 * Payment endpoint
 */

export type PayReq = {
	billingOption: BillingOptions;
	me: BillingMe;
	person: BillingPerson;
	company: BillingCompany;
};

export type PayRes = {
	sessionUrl: string | null;
};

export const PayValues: PayReq = {
	billingOption: null,
	me: BillingMeValues,
	person: BillingPersonValues,
	company: BillingCompanyValues,
};

export const PaySchema = yup.object({
	//
	billingOption: yup
		.string()
		.oneOf([...BillingOptions])
		.required(),
	//
	me: yup.object().when("billingOption", {
		is: BillingOptions[0],
		then: (schema) => BillingMeSchema.required(),
		otherwise: (schema) => schema,
	}),
	person: yup.object().when("billingOption", {
		is: BillingOptions[1],
		then: (schema) => BillingPersonSchema.required(),
		otherwise: (schema) => schema,
	}),
	company: yup.object().when("billingOption", {
		is: BillingOptions[2],
		then: (schema) => BillingCompanySchema.required(),
		otherwise: (schema) => schema,
	}),
});
