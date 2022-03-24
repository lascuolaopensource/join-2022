import * as yup from 'yup';
import { gql } from 'graphql-tag';

/**
 * Regex checks
 */

const re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
};
/**
 * Schemas
 */

const urlSchema = yup.string().matches(re.url);
const cfSchema = yup.string().uppercase().matches(re.cf);
const emailSchema = yup.string().email();
/**
 * Yup dynamic checks
 */

function thenReq(value) {
  return {
    is: value,
    then: schema => schema.required(),
    otherwise: schema => schema.nullable().optional()
  };
}
function thenUrlReq(value) {
  return {
    is: value,
    then: schema => urlSchema.required(),
    otherwise: schema => schema.nullable().optional()
  };
}
function thenNull(value) {
  return {
    is: value,
    then: schema => schema.nullable().optional(),
    otherwise: schema => schema.required()
  };
}
const nullOrReq = {
  is: v => v == true,
  then: s => s.nullable(),
  otherwise: s => s.required()
};

var index$4 = {
	__proto__: null,
	re: re,
	urlSchema: urlSchema,
	cfSchema: cfSchema,
	emailSchema: emailSchema,
	thenReq: thenReq,
	thenUrlReq: thenUrlReq,
	thenNull: thenNull,
	nullOrReq: nullOrReq
};

/**
 * Contacts
 */

const ContactsValues = {
  exists: false,
  email: "",
  name: "",
  surname: "",
  phone: ""
};
const ContactsSchema = yup.object({
  exists: yup.boolean().required(),
  email: yup.string().email().when("exists", thenReq(false)),
  name: yup.string().required().when("exists", thenReq(false)),
  surname: yup.string().required().when("exists", thenReq(false)),
  phone: yup.string().required()
});
/**
 * Evaluation
 */

const EvaluationValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
const EvaluationSchema = yup.object({
  letterNeeded: yup.boolean().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup.boolean().required(),
  portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: yup.string().when("cvNeeded", thenUrlReq(true))
});
/**
 * Enroll
 */

const EnrollValues = {
  courseId: "",
  contacts: ContactsValues,
  evaluation: EvaluationValues
};
const EnrollSchema = yup.object({
  courseId: yup.string().required(),
  contacts: ContactsSchema,
  evaluation: EvaluationSchema
});

const LoginEmailValues = {
  email: ""
};
const LoginEmailSchema = yup.object({
  email: emailSchema.required()
});

/**
 * Login
 */

const LoginValues = {
  identifier: "",
  password: ""
};
const LoginSchema = yup.object({
  identifier: emailSchema.required(),
  password: yup.string().required()
});

var Enum_Enrollment_State;

(function (Enum_Enrollment_State) {
  Enum_Enrollment_State["Approved"] = "approved";
  Enum_Enrollment_State["AwaitingPayment"] = "awaitingPayment";
  Enum_Enrollment_State["Pending"] = "pending";
  Enum_Enrollment_State["Rejected"] = "rejected";
})(Enum_Enrollment_State || (Enum_Enrollment_State = {}));

var PublicationState;

(function (PublicationState) {
  PublicationState["Live"] = "LIVE";
  PublicationState["Preview"] = "PREVIEW";
})(PublicationState || (PublicationState = {}));

var PaymentCategories;

(function (PaymentCategories) {
  PaymentCategories["course"] = "course";
})(PaymentCategories || (PaymentCategories = {}));
/**
 * Billing options
 */


const BillingOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
// Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json

var BillingOptionsComponents;

(function (BillingOptionsComponents) {
  BillingOptionsComponents["Company"] = "billing.company";
  BillingOptionsComponents["Person"] = "billing.person";
  BillingOptionsComponents["Me"] = "billing.me";
})(BillingOptionsComponents || (BillingOptionsComponents = {}));

var index$3 = {
	__proto__: null,
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	BillingOptions: BillingOptions,
	get BillingOptionsComponents () { return BillingOptionsComponents; }
};

/**
 * Billing data
 */
// Me

const BillingMeValues = {
  cf: ""
};
const BillingMeSchema = yup.object({
  cf: cfSchema
}); // Person

const BillingPersonValues = {
  name: "",
  surname: "",
  cf: ""
};
const BillingPersonSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  cf: cfSchema
}); // Company

const BillingCompanyValues = {
  name: "",
  vat: "",
  sdi: ""
};
const BillingCompanySchema = yup.object({
  name: yup.string().required(),
  vat: yup.string().required(),
  sdi: yup.string()
});
/**
 * Address
 */

const AddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
const AddressSchema = yup.object({
  cap: yup.string().required(),
  town: yup.string().required(),
  province: yup.string().required(),
  street: yup.string().required()
});
const PayValues = {
  billingOption: null,
  me: BillingMeValues,
  person: BillingPersonValues,
  company: BillingCompanyValues,
  email: "",
  address: AddressValues
};
const PaySchema = yup.object({
  // Modalità
  billingOption: yup.string().oneOf(BillingOptions).required(),
  //
  me: BillingMeSchema.when("billingOption", thenReq(BillingOptions[0])),
  person: BillingPersonSchema.when("billingOption", thenReq(BillingOptions[1])),
  company: BillingCompanySchema.when("billingOption", thenReq(BillingOptions[2])),
  // Generici
  email: yup.string().email().when("billingOption", thenNull(BillingOptions[0])),
  address: AddressSchema.required()
});

const UserExistsSchema = yup.object({
  email: emailSchema.required()
});

var index$2 = {
	__proto__: null,
	ContactsValues: ContactsValues,
	ContactsSchema: ContactsSchema,
	EvaluationValues: EvaluationValues,
	EvaluationSchema: EvaluationSchema,
	EnrollValues: EnrollValues,
	EnrollSchema: EnrollSchema,
	LoginEmailValues: LoginEmailValues,
	LoginEmailSchema: LoginEmailSchema,
	LoginValues: LoginValues,
	LoginSchema: LoginSchema,
	BillingMeValues: BillingMeValues,
	BillingMeSchema: BillingMeSchema,
	BillingPersonValues: BillingPersonValues,
	BillingPersonSchema: BillingPersonSchema,
	BillingCompanyValues: BillingCompanyValues,
	BillingCompanySchema: BillingCompanySchema,
	AddressValues: AddressValues,
	AddressSchema: AddressSchema,
	PayValues: PayValues,
	PaySchema: PaySchema,
	UserExistsSchema: UserExistsSchema
};

let _ = t => t,
    _t;
const getCoursePageBySlug = gql(_t || (_t = _`
	query getCoursePageBySlug($slug: String!) {
		courses(filters: { slug: { eq: $slug } }) {
			data {
				attributes {
					title
					description
					slug
					meetings {
						date
						timeSlots {
							startTime
							endTime
						}
					}
				}
			}
		}
	}
`)); // export const getCourseEnrollmentBySlug = gql`
// 	query getCourseEnrollmentBySlug($slug: String!) {
// 		courses(filters: { slug: { eq: $slug } }) {
// 			data {
// 				id
// 				attributes {
// 					title
// 					slug
// 					enrollmentDeadline
// 					motivationalLetterNeeded
// 					cvNeeded
// 					portfolioNeeded
// 					price
// 				}
// 			}
// 		}
// 	}
// `;

var index$1 = {
	__proto__: null,
	getCoursePageBySlug: getCoursePageBySlug
};

function isPaymentNeeded(c) {
  return c.price > 0;
}
function isEvaluationNeeded(c) {
  return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}
function isEnrollable(c) {
  return Date.now() < Date.parse(c.enrollmentDeadline);
}

var course = {
	__proto__: null,
	isPaymentNeeded: isPaymentNeeded,
	isEvaluationNeeded: isEvaluationNeeded,
	isEnrollable: isEnrollable
};

var index = {
	__proto__: null,
	course: course
};

export { index$2 as e, index$1 as gql, index as h, index$3 as t, index$4 as validators };
//# sourceMappingURL=index.modern.js.map
