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
    otherwise: schema => schema.nullable()
  };
}
function thenNull(value) {
  return {
    is: value,
    then: schema => schema.nullable(),
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
  data: {
    email: "",
    name: "",
    surname: ""
  },
  phone: ""
};
const cSchema = yup.object({
  exists: yup.boolean().required(),
  data: yup.object({
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
  portfolio: urlSchema.when("portfolioNeeded", thenReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: urlSchema.when("cvNeeded", thenReq(true))
});

var evaluation = {
    __proto__: null,
    evValues: evValues,
    evSchema: evSchema
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

const bOptions = ["me", "person", "company"];
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
    bValues: bValues,
    bSchema: bSchema
};

/**
 * Enrollment form
 */

const enSchema = yup.object({
  courseId: yup.number().required(),
  contacts: cSchema,
  evaluationNeeded: yup.boolean().required(),
  evaluation: evSchema.when("evaluationNeeded", thenReq(true)),
  billingNeeded: yup.boolean().required(),
  billing: bSchema.when("billingNeeded", thenReq(true))
});

var enroll = {
    __proto__: null,
    enSchema: enSchema
};

var index$1 = {
    __proto__: null,
    loginEmail: loginEmail,
    loginPassword: loginPassword,
    userExists: userExists,
    enroll: enroll,
    billing: billing,
    contacts: contacts,
    evaluation: evaluation
};

var PublicationState;

(function (PublicationState) {
  PublicationState["Live"] = "LIVE";
  PublicationState["Preview"] = "PREVIEW";
})(PublicationState || (PublicationState = {}));

var Enum_Enrollment_State;

(function (Enum_Enrollment_State) {
  Enum_Enrollment_State["Pending"] = "pending";
  Enum_Enrollment_State["Approved"] = "approved";
  Enum_Enrollment_State["Rejected"] = "rejected";
})(Enum_Enrollment_State || (Enum_Enrollment_State = {}));

var index = {
    __proto__: null,
    get PublicationState () { return PublicationState; },
    get Enum_Enrollment_State () { return Enum_Enrollment_State; }
};

export { index$1 as f, index as t };
//# sourceMappingURL=index.modern.js.map
