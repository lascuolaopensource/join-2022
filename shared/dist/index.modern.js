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
 * Util
 */

/**
 * User
 */

const userVal = yup.object({
  exists: yup.boolean().required(),
  data: yup.object({
    email: yup.string().email().required(),
    name: yup.string().required(),
    surname: yup.string().required()
  }).when("exists", thenReq(false))
});
/**
 * Phone
 */

const phoneVal = yup.string().required();
/**
 * Evaluation
 */

const evaluationVal = yup.object({
  letterNeeded: yup.boolean().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup.boolean().required(),
  portfolio: urlSchema.when("portfolioNeeded", thenReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: urlSchema.when("cvNeeded", thenReq(true))
});
/**
 * Address
 */

const addressVal = yup.object({
  cap: yup.string().required(),
  town: yup.string().required(),
  province: yup.string().required(),
  street: yup.string().required()
});
/**
 * Billing
 */

const billingOptions = ["me", "person", "company"];
const billingVal = yup.object({
  billingOption: yup.string().oneOf(billingOptions).required(),
  // Me
  me: yup.object({
    cf: cfSchema
  }).when("billingOption", thenReq(billingOptions[0])),
  // Persona fisica
  person: yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    cf: cfSchema
  }).when("billingOption", thenReq(billingOptions[1])),
  // Azienda
  company: yup.object({
    name: yup.string().required(),
    vat: yup.string().required(),
    sdi: yup.string().required()
  }).when("billingOption", thenReq(billingOptions[2])),
  // Generici
  email: yup.string().email().when("billingOption", thenNull(billingOptions[0])),
  address: addressVal.required()
});
/**
 * Enrollment
 */

const enrollVal = yup.object({
  courseId: yup.number().required(),
  user: userVal.required(),
  phone: phoneVal.required(),
  evaluationNeeded: yup.boolean().required(),
  evaluation: evaluationVal.when("evaluationNeeded", thenReq(true)),
  billingNeeded: yup.boolean().required(),
  billing: billingVal.when("billingNeeded", thenReq(true))
}).required(); //

var index$1 = {
    __proto__: null,
    userVal: userVal,
    phoneVal: phoneVal,
    evaluationVal: evaluationVal,
    addressVal: addressVal,
    billingOptions: billingOptions,
    billingVal: billingVal,
    enrollVal: enrollVal,
    loginEmail: loginEmail
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
