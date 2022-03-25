import * as yup from "yup";
import {
	cfSchema,
	provinciaSchema,
	capSchema,
	setYupDefaultMessages,
} from "../validators";
import { BillingOptions } from "../types";

setYupDefaultMessages();

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
	cap: capSchema.required(),
	town: yup.string().required(),
	province: provinciaSchema.required(),
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
	//
	email: yup.string().when("billingOption", {
		is: BillingOptions[0],
		then: (schema) => schema.nullable().optional(),
		otherwise: (schema) => schema.email().required(),
	}),
	//
	address: AddressSchema.required(),
});
