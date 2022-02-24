import * as yup from 'yup';

var re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
};
var urlSchema = yup.string().matches(re.url);
var cfSchema = yup.string().matches(re.cf);
var emailSchema = yup.string().email();
function thenReq(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.required();
    },
    otherwise: function otherwise(schema) {
      return schema.nullable();
    }
  };
}
function thenNull(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.nullable();
    },
    otherwise: function otherwise(schema) {
      return schema.required();
    }
  };
}

/**
 * LoginEmail
 */

var leValues = {
  email: ""
};
var leSchema = yup.object({
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

var lpValues = {
  password: ""
};
var lpSchema = yup.object({
  password: yup.string().required()
});

var loginPassword = {
    __proto__: null,
    lpValues: lpValues,
    lpSchema: lpSchema
};

var ueSchema = yup.object({
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

var cValues = {
  exists: false,
  user: {
    email: "",
    name: "",
    surname: ""
  },
  phone: ""
};
var cSchema = yup.object({
  exists: yup["boolean"]().required(),
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

var evValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
var evSchema = yup.object({
  letterNeeded: yup["boolean"]().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup["boolean"]().required(),
  portfolio: urlSchema.when("portfolioNeeded", thenReq(true)),
  cvNeeded: yup["boolean"]().required(),
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

var bMeValues = {
  cf: ""
};
var bMeSchema = yup.object({
  cf: cfSchema
});
/**
 * Person
 */

var bPersonValues = {
  name: "",
  surname: "",
  cf: ""
};
var bPersonSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  cf: cfSchema
});
/**
 * Company
 */

var bCompanyValues = {
  name: "",
  vat: "",
  sdi: ""
};
var bCompanySchema = yup.object({
  name: yup.string().required(),
  vat: yup.string().required(),
  sdi: yup.string().required()
});
/**
 * Address
 */

var bAddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
var bAddressSchema = yup.object({
  cap: yup.string().required(),
  town: yup.string().required(),
  province: yup.string().required(),
  street: yup.string().required()
});
/**
 * Billing options
 */

var bOptions = ["me", "person", "company"];
/**
 * Billing
 */

var bValues = {
  billingOption: null,
  me: bMeValues,
  person: bPersonValues,
  company: bCompanyValues,
  email: "",
  address: bAddressValues
};
var bSchema = yup.object({
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

var enSchema = yup.object({
  courseId: yup.number().required(),
  contacts: cSchema,
  evaluationNeeded: yup["boolean"]().required(),
  evaluation: evSchema.when("evaluationNeeded", thenReq(true)),
  billingNeeded: yup["boolean"]().required(),
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
  Enum_Enrollment_State["AwaitingPayment"] = "awaitingPayment";
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
//# sourceMappingURL=index.module.js.map
