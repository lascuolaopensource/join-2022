import * as yup from 'yup';

const re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
};
const urlSchema = yup.string().matches(re.url);
const cfSchema = yup.string().matches(re.cf);
const emailSchema = yup.string().email();
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

/**
 * LoginEmail
 */

const leValues = {
  email: ""
};
const leSchema = yup.object({
  email: emailSchema.required()
});

var loginEmail = {
    __proto__: null,
    leValues: leValues,
    leSchema: leSchema
};

/**
 * LoginPassword
 */

const lpValues = {
  password: ""
};
const lpSchema = yup.object({
  password: yup.string().required()
});

var loginPassword = {
    __proto__: null,
    lpValues: lpValues,
    lpSchema: lpSchema
};

const ueSchema = yup.object({
  email: emailSchema.optional(),
  username: yup.string().optional()
});

var userExists = {
    __proto__: null,
    ueSchema: ueSchema
};

/**
 * Contacts
 */

const cValues = {
  exists: false,
  user: {
    email: "",
    name: "",
    surname: ""
  },
  phone: ""
};
const cSchema = yup.object({
  exists: yup.boolean().required(),
  user: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    surname: yup.string().required()
  }).when("exists", thenReq(false)),
  phone: yup.string().required()
});

var contacts = {
    __proto__: null,
    cValues: cValues,
    cSchema: cSchema
};

/**
 * Evaluation
 */

const evValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
const evSchema = yup.object({
  letterNeeded: yup.boolean().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup.boolean().required(),
  portfolio: yup.string().when("portfolioNeeded", thenUrlReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: yup.string().when("cvNeeded", thenUrlReq(true))
});

var evaluation = {
    __proto__: null,
    evValues: evValues,
    evSchema: evSchema
};

/**
 * Enrollment form
 */

const enSchema = yup.object({
  courseId: yup.number().required(),
  contacts: cSchema,
  evaluationNeeded: yup.boolean().required(),
  evaluation: evSchema.when("evaluationNeeded", thenReq(true))
});

var enroll = {
    __proto__: null,
    enSchema: enSchema
};

/**
 * Me
 */

const bMeValues = {
  cf: ""
};
const bMeSchema = yup.object({
  cf: cfSchema
});
/**
 * Person
 */

const bPersonValues = {
  name: "",
  surname: "",
  cf: ""
};
const bPersonSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  cf: cfSchema
});
/**
 * Company
 */

const bCompanyValues = {
  name: "",
  vat: "",
  sdi: ""
};
const bCompanySchema = yup.object({
  name: yup.string().required(),
  vat: yup.string().required(),
  sdi: yup.string().required()
});
/**
 * Address
 */

const bAddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
const bAddressSchema = yup.object({
  cap: yup.string().required(),
  town: yup.string().required(),
  province: yup.string().required(),
  street: yup.string().required()
});
/**
 * Billing options
 */

const bOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
// Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json

const bOptionsComp = {
  company: "billing.company",
  person: "billing.person",
  me: "billing.me"
};
/**
 * Billing
 */

const bValues = {
  billingOption: null,
  me: bMeValues,
  person: bPersonValues,
  company: bCompanyValues,
  email: "",
  address: bAddressValues
};
const bSchema = yup.object({
  // Modalità
  billingOption: yup.string().oneOf(bOptions).required(),
  // Me
  me: bMeSchema.when("billingOption", thenReq(bOptions[0])),
  person: bPersonSchema.when("billingOption", thenReq(bOptions[1])),
  company: bCompanySchema.when("billingOption", thenReq(bOptions[2])),
  // Generici
  email: yup.string().email().when("billingOption", thenNull(bOptions[0])),
  address: bAddressSchema.required()
});

var billing = {
    __proto__: null,
    bMeValues: bMeValues,
    bMeSchema: bMeSchema,
    bPersonValues: bPersonValues,
    bPersonSchema: bPersonSchema,
    bCompanyValues: bCompanyValues,
    bCompanySchema: bCompanySchema,
    bAddressValues: bAddressValues,
    bAddressSchema: bAddressSchema,
    bOptions: bOptions,
    bOptionsComp: bOptionsComp,
    bValues: bValues,
    bSchema: bSchema
};

/**
 * Payment
 */

const pSchema = yup.object({
  paymentHash: yup.string(),
  billing: bSchema.required()
});

var payment = {
    __proto__: null,
    pSchema: pSchema
};

var index$2 = {
    __proto__: null,
    loginEmail: loginEmail,
    loginPassword: loginPassword,
    userExists: userExists,
    enroll: enroll,
    billing: billing,
    contacts: contacts,
    evaluation: evaluation,
    payment: payment
};

var PublicationState;

(function (PublicationState) {
  PublicationState["Live"] = "LIVE";
  PublicationState["Preview"] = "PREVIEW";
})(PublicationState || (PublicationState = {}));

var Enum_Enrollment_State;

(function (Enum_Enrollment_State) {
  Enum_Enrollment_State["AwaitingPayment"] = "awaitingPayment";
  Enum_Enrollment_State["Pending"] = "pending";
  Enum_Enrollment_State["Approved"] = "approved";
  Enum_Enrollment_State["Rejected"] = "rejected";
})(Enum_Enrollment_State || (Enum_Enrollment_State = {}));

var index$1 = {
    __proto__: null,
    get PublicationState () { return PublicationState; },
    get Enum_Enrollment_State () { return Enum_Enrollment_State; }
};

function isBillingNeeded(c) {
  return c.price > 0;
}
function isEvaluationNeeded(c) {
  return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}

var index = {
    __proto__: null,
    isBillingNeeded: isBillingNeeded,
    isEvaluationNeeded: isEvaluationNeeded
};

export { index$2 as f, index as h, index$1 as t };
//# sourceMappingURL=index.modern.js.map
