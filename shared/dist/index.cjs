var yup = require('yup');
var graphqlTag = require('graphql-tag');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return n;
}

var yup__namespace = /*#__PURE__*/_interopNamespace(yup);

/**
 * Setting yup default messages
 */

function setYupDefaultMessages() {
  yup__namespace.setLocale({
    string: {
      matches: "Il campo non \xE8 valido"
    }
  });
}
setYupDefaultMessages();
/**
 * Regex checks
 */

var re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/,
  phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  provincia: /^[A-Z]{2}$/,
  cap: /^[0-9]{5}$/
};
/**
 * Schemas
 */

var urlSchema = yup__namespace.string().lowercase().matches(re.url);
var cfSchema = yup__namespace.string().uppercase().matches(re.cf);
var phoneSchema = yup__namespace.string().matches(re.phone);
var provinciaSchema = yup__namespace.string().uppercase().matches(re.provincia);
var capSchema = yup__namespace.string().matches(re.cap);
var emailSchema = yup__namespace.string().email();
/**
 * Yup dynamic checks
 */

function thenReq(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.required();
    },
    otherwise: function otherwise(schema) {
      return schema.nullable().optional();
    }
  };
}
function thenUrlReq(value) {
  return {
    is: value,
    then: function then(schema) {
      return urlSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema.nullable().optional();
    }
  };
}
function thenNull(value) {
  return {
    is: value,
    then: function then(schema) {
      return schema.nullable().optional();
    },
    otherwise: function otherwise(schema) {
      return schema.required();
    }
  };
}
var nullOrReq = {
  is: function is(v) {
    return v == true;
  },
  then: function then(s) {
    return s.nullable();
  },
  otherwise: function otherwise(s) {
    return s.required();
  }
};

var index$4 = {
	__proto__: null,
	setYupDefaultMessages: setYupDefaultMessages,
	re: re,
	urlSchema: urlSchema,
	cfSchema: cfSchema,
	phoneSchema: phoneSchema,
	provinciaSchema: provinciaSchema,
	capSchema: capSchema,
	emailSchema: emailSchema,
	thenReq: thenReq,
	thenUrlReq: thenUrlReq,
	thenNull: thenNull,
	nullOrReq: nullOrReq
};

setYupDefaultMessages();
/**
 * Contacts
 */

var ContactsValues = {
  exists: false,
  email: "",
  name: "",
  surname: "",
  phone: ""
};
var ContactsSchema = yup__namespace.object({
  exists: yup__namespace["boolean"]().required(),
  email: yup__namespace.string().email().when("exists", thenReq(false)),
  name: yup__namespace.string().required().when("exists", thenReq(false)),
  surname: yup__namespace.string().required().when("exists", thenReq(false)),
  phone: phoneSchema.required()
});
/**
 * Evaluation
 */

var EvaluationValues = {
  letterNeeded: true,
  letter: "",
  portfolioNeeded: true,
  portfolio: "",
  cvNeeded: true,
  cv: ""
};
var EvaluationSchema = yup__namespace.object({
  letterNeeded: yup__namespace["boolean"]().required(),
  letter: yup__namespace.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup__namespace["boolean"]().required(),
  portfolio: yup__namespace.string().when("portfolioNeeded", thenUrlReq(true)),
  cvNeeded: yup__namespace["boolean"]().required(),
  cv: yup__namespace.string().when("cvNeeded", thenUrlReq(true))
});
/**
 * Enroll
 */

var EnrollValues = {
  courseId: "",
  contacts: ContactsValues,
  evaluation: EvaluationValues
};
var EnrollSchema = yup__namespace.object({
  courseId: yup__namespace.string().required(),
  contacts: ContactsSchema,
  evaluation: EvaluationSchema
});

setYupDefaultMessages();
var LoginEmailValues = {
  email: ""
};
var LoginEmailSchema = yup__namespace.object({
  email: emailSchema.required()
});

setYupDefaultMessages();
/**
 * Login
 */

var LoginValues = {
  identifier: "",
  password: ""
};
var LoginSchema = yup__namespace.object({
  identifier: emailSchema.required(),
  password: yup__namespace.string().required()
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


var BillingOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
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

setYupDefaultMessages();
/**
 * Billing data
 */
// Me

var BillingMeValues = {
  cf: ""
};
var BillingMeSchema = yup__namespace.object({
  cf: cfSchema
}); // Person

var BillingPersonValues = {
  name: "",
  surname: "",
  cf: ""
};
var BillingPersonSchema = yup__namespace.object({
  name: yup__namespace.string().required(),
  surname: yup__namespace.string().required(),
  cf: cfSchema
}); // Company

var BillingCompanyValues = {
  name: "",
  vat: "",
  sdi: ""
};
var BillingCompanySchema = yup__namespace.object({
  name: yup__namespace.string().required(),
  vat: yup__namespace.string().required(),
  sdi: yup__namespace.string()
});
/**
 * Address
 */

var AddressValues = {
  cap: "",
  town: "",
  street: "",
  province: ""
};
var AddressSchema = yup__namespace.object({
  cap: capSchema.required(),
  town: yup__namespace.string().required(),
  province: provinciaSchema.required(),
  street: yup__namespace.string().required()
});
var PayValues = {
  billingOption: null,
  me: BillingMeValues,
  person: BillingPersonValues,
  company: BillingCompanyValues,
  email: "",
  address: AddressValues
};
var PaySchema = yup__namespace.object({
  //
  billingOption: yup__namespace.string().oneOf([].concat(BillingOptions)).required(),
  //
  me: yup__namespace.object().when("billingOption", {
    is: BillingOptions[0],
    then: function then(schema) {
      return BillingMeSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  }),
  person: yup__namespace.object().when("billingOption", {
    is: BillingOptions[1],
    then: function then(schema) {
      return BillingPersonSchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  }),
  company: yup__namespace.object().when("billingOption", {
    is: BillingOptions[2],
    then: function then(schema) {
      return BillingCompanySchema.required();
    },
    otherwise: function otherwise(schema) {
      return schema;
    }
  }),
  //
  email: yup__namespace.string().when("billingOption", {
    is: BillingOptions[0],
    then: function then(schema) {
      return schema.nullable().optional();
    },
    otherwise: function otherwise(schema) {
      return schema.email().required();
    }
  }),
  //
  address: AddressSchema.required()
});

setYupDefaultMessages();
var UserExistsSchema = yup__namespace.object({
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

function _taggedTemplateLiteralLoose(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  strings.raw = raw;
  return strings;
}

var _templateObject;
var getCoursePageBySlug = graphqlTag.gql(_templateObject || (_templateObject = _taggedTemplateLiteralLoose(["\n\tquery getCoursePageBySlug($slug: String!) {\n\t\tcourses(filters: { slug: { eq: $slug } }) {\n\t\t\tdata {\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\tslug\n\t\t\t\t\tmeetings {\n\t\t\t\t\t\tdate\n\t\t\t\t\t\ttimeSlots {\n\t\t\t\t\t\t\tstartTime\n\t\t\t\t\t\t\tendTime\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"]))); // export const getCourseEnrollmentBySlug = gql`
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

exports.Errors = void 0;

(function (Errors) {
  Errors["DefaultRoleNotFound"] = "DefaultRoleNotFound";
  Errors["EmailSendError"] = "EmailSendError";
  Errors["EmailTaken"] = "EmailTaken";
  Errors["NotFound"] = "NotFound";
  Errors["PasswordThreeDollars"] = "PasswordThreeDollars";
  Errors["PaymentAlreadyPaid"] = "PaymentAlreadyPaid";
  Errors["PaymentExpired"] = "PaymentExpired";
  Errors["PaymentNotFound"] = "PaymentNotFound";
  Errors["RegisterDisabled"] = "RegisterDisabled";
  Errors["UnknownError"] = "UnknownError";
  Errors["UserNotConfirmed"] = "UserNotConfirmed";
  Errors["ValidationError"] = "ValidationError";
  Errors["UserExists"] = "UserExists";
  Errors["EnrollmentExpired"] = "EnrollmentExpired";
  Errors["AlreadyEnrolled"] = "AlreadyEnrolled";
})(exports.Errors || (exports.Errors = {}));

exports.e = index$2;
exports.gql = index$1;
exports.h = index;
exports.t = index$3;
exports.validators = index$4;
//# sourceMappingURL=index.cjs.map
