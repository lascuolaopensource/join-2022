import * as yup from "yup";
import { thenReq, thenUrlReq } from "./utils";

/**
 * Contacts
 */

export const ContactsValues = {
	exists: false,
	user: {
		email: "",
		name: "",
		surname: "",
	},
	phone: "",
};

export const ContactsSchema = yup.object({
	exists: yup.boolean().required(),
	user: yup
		.object({
			email: yup.string().email().required(),
			name: yup.string().required(),
			surname: yup.string().required(),
		})
		.when("exists", thenReq(false)),
	phone: yup.string().required(),
});

export type Contacts = typeof ContactsValues;

/**
 * Evaluation
 */

export const EvaluationValues = {
	letterNeeded: true,
	letter: "",
	portfolioNeeded: true,
	portfolio: "",
	cvNeeded: true,
	cv: "",
};

export const EvaluationSchema = yup.object({
	letterNeeded: yup.boolean().required(),
	letter: yup.string().when("letterNeeded", thenReq(true)),
	portfolioNeeded: yup.boolean().required(),
	portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
	cvNeeded: yup.boolean().required(),
	cv: yup.string().when("cvNeeded", thenUrlReq(true)),
});

export type Evaluation = typeof EvaluationValues;

/**
 * Enroll
 */

export const EnrollValues = {
	courseId: "",
	contacts: ContactsValues,
	evaluation: EvaluationValues,
};

export const EnrollSchema = yup.object({
	courseId: yup.string().required(),
	contacts: ContactsSchema,
	evaluation: EvaluationSchema,
});

export type EnrollReq = {
	courseId: string;
	contacts: Contacts;
	evaluation: Evaluation;
};

export type EnrollRes = {
	paymentId: string | null;
};
