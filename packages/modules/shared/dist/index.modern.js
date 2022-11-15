import * as yup from 'yup';

var Regex;
(function (Regex) {
  // Fiscal codes
  Regex.vat = /^[0-9]{11}$/;
  Regex.sdi = /^([0-9]|[A-Z]){6,7}$/;
  Regex.cf = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/;
  // Location
  Regex.provincia = /^[A-Z]{2}$/;
  Regex.cap = /^[0-9]{5}$/;
  // Contacts
  Regex.pec = /^(.*)@(?:\w*\.)*pec(?:\.\w+)+$/;
  Regex.phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  Regex.url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
})(Regex || (Regex = {}));

var Schemas;
(function (Schemas) {
  /**
   * Basic schemas
   */
  Schemas.url = yup.string().lowercase().matches(Regex.url);
  Schemas.cf = yup.string().uppercase().matches(Regex.cf);
  Schemas.vat = yup.string().matches(Regex.vat);
  Schemas.sdi = yup.string().uppercase().matches(Regex.sdi);
  Schemas.phone = yup.string().matches(Regex.phone);
  Schemas.email = yup.string().email();
  Schemas.pec = Schemas.email.matches(Regex.pec);
  Schemas.provincia = yup.string().uppercase().matches(Regex.provincia);
  Schemas.cap = yup.string().matches(Regex.cap);
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
  Schemas.thenReq = thenReq;
  function thenUrlReq(value) {
    return {
      is: value,
      then: schema => Schemas.url.required(),
      otherwise: schema => schema.nullable().optional()
    };
  }
  Schemas.thenUrlReq = thenUrlReq;
  function thenNull(value) {
    return {
      is: value,
      then: schema => schema.nullable().optional(),
      otherwise: schema => schema.required()
    };
  }
  Schemas.thenNull = thenNull;
  Schemas.nullOrReq = {
    is: v => v == true,
    then: s => s.nullable(),
    otherwise: s => s.required()
  };
})(Schemas || (Schemas = {}));

var index$a = {
	__proto__: null,
	get Regex () { return Regex; },
	get Schemas () { return Schemas; }
};

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
 * Enrollment states, as list
 */
const EnrollmentStates = Object.values(Enum_Enrollment_State);
// import {
// 	UsersPermissionsMe,
// 	ComponentLocationAddress,
// 	BillingInfoDataDynamicZone,
// 	Payment,
// } from "./types";
// export type Comp<T> = Partial<T> & { __component: string };
// /**
//  * Login
//  */
// export interface LoginResponse {
// 	jwt?: string;
// 	user: UsersPermissionsMe;
// }
// /**
//  * Payment
//  */
// export interface PaymentC extends Payment {
// 	confirmCode: string;
// }
// export interface PaymentBillingInfo {
// 	address: ComponentLocationAddress;
// 	data: Comp<BillingInfoDataDynamicZone>;
// }
// /**
//  * Billing options
//  */
// // Lista dei componenti per la zona dinamica
// // Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json
// export enum BillingOptionsComponents {
// 	Company = "billing.company",
// 	Person = "billing.person",
// 	Me = "billing.me",
// }
// /**
//  * Roles
//  */
// export enum UserPermissionRoles {
// 	Public = "public",
// 	Authenticated = "authenticated",
// 	AdminEnrollments = "admin_enrollments",
// 	AdminTools = "admin_tools",
// }

var HTTPMethod;
(function (HTTPMethod) {
  HTTPMethod["CONNECT"] = "CONNECT";
  HTTPMethod["DELETE"] = "DELETE";
  HTTPMethod["GET"] = "GET";
  HTTPMethod["HEAD"] = "HEAD";
  HTTPMethod["OPTIONS"] = "OPTIONS";
  HTTPMethod["PATCH"] = "PATCH";
  HTTPMethod["POST"] = "POST";
  HTTPMethod["PUT"] = "PUT";
  HTTPMethod["TRACE"] = "TRACE";
})(HTTPMethod || (HTTPMethod = {}));

var index$9 = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod; },
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	EnrollmentStates: EnrollmentStates
};

var Create;
(function (Create) {
  Create.path = "/account/create";
  Create.method = HTTPMethod.POST;
  Create.values = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };
  Create.schema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    email: Schemas.email.required(),
    password: yup.string().required()
  }).required();
})(Create || (Create = {}));

var UserExists;
(function (UserExists) {
  UserExists.path = "/account/user-exists";
  UserExists.method = HTTPMethod.POST;
  UserExists.values = {
    email: ""
  };
  UserExists.schema = yup.object({
    email: Schemas.email.required()
  }).required();
})(UserExists || (UserExists = {}));

//
const path = "/auth/local";
const method = HTTPMethod.POST;
const values = {
  identifier: "",
  password: ""
};
const schema = yup.object({
  identifier: Schemas.email.required(),
  password: yup.string().required()
}).required();

var login = {
	__proto__: null,
	path: path,
	method: method,
	values: values,
	schema: schema
};

var Forgot;
(function (Forgot) {
  Forgot.path = "/auth/forgot-password";
  Forgot.method = HTTPMethod.POST;
  Forgot.values = {
    email: ""
  };
  Forgot.schema = yup.object({
    email: Schemas.email.required()
  }).required();
})(Forgot || (Forgot = {}));

var Reset;
(function (Reset) {
  Reset.path = "/auth/reset-password";
  Reset.method = HTTPMethod.POST;
  Reset.values = {
    password: "string",
    passwordConfirmation: "string",
    code: "string"
  };
  Reset.schema = yup.object({
    password: yup.string().required(),
    passwordConfirmation: yup.string().required(),
    code: yup.string().required()
  }).required();
})(Reset || (Reset = {}));

var index$8 = {
	__proto__: null,
	get Forgot () { return Forgot; },
	get Reset () { return Reset; }
};

var index$7 = {
	__proto__: null,
	Login: login,
	Password: index$8,
	get Create () { return Create; },
	get UserExists () { return UserExists; }
};

var Contacts;
(function (Contacts) {
  Contacts.values = {
    email: "",
    name: "",
    surname: "",
    phone: ""
  };
  const USER_EXISTS = "$userExists";
  Contacts.schema = yup.object({
    email: yup.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
    name: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
    surname: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
    phone: Schemas.phone.required()
  });
  function getSchemaCtx(userExists) {
    return {
      userExists
    };
  }
  Contacts.getSchemaCtx = getSchemaCtx;
})(Contacts || (Contacts = {}));

var Evaluation;
(function (Evaluation) {
  Evaluation.values = {
    letter: "",
    portfolio: "",
    cv: ""
  };
  Evaluation.schema = yup.object({
    letter: yup.string().when("$letterNeeded", Schemas.thenReq(true)),
    portfolio: yup.string().when("$portfolioNeeded", Schemas.thenUrlReq(true)),
    cv: yup.string().when("$cvNeeded", Schemas.thenUrlReq(true))
  });
  function getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded) {
    return {
      letterNeeded,
      portfolioNeeded,
      cvNeeded
    };
  }
  Evaluation.getSchemaCtx = getSchemaCtx;
})(Evaluation || (Evaluation = {}));

var Address;
(function (Address) {
  Address.values = {
    country: "",
    administrativeArea: "",
    city: "",
    postCode: "",
    street: "",
    number: ""
  };
  Address.schema = yup.object({
    country: yup.string().required(),
    administrativeArea: Schemas.provincia.required(),
    city: yup.string().required(),
    postCode: Schemas.cap.required(),
    street: yup.string().required(),
    number: yup.string().required()
  });
})(Address || (Address = {}));

//
var Owner;
(function (Owner) {
  Owner.values = {
    fiscalCode: ""
  };
  Owner.schema = yup.object({
    fiscalCode: Schemas.cf.required()
  });
})(Owner || (Owner = {}));

//
var Person;
(function (Person) {
  Person.values = {
    name: "",
    surname: "",
    fiscalCode: "",
    email: ""
  };
  Person.schema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    fiscalCode: Schemas.cf.required(),
    email: Schemas.email.required()
  });
})(Person || (Person = {}));

//
var Company;
(function (Company) {
  Company.values = {
    name: "",
    vatNumber: "",
    sdiCode: "",
    certifiedEmail: ""
  };
  Company.schema = yup.object({
    name: yup.string().required(),
    vatNumber: Schemas.vat.required(),
    sdiCode: Schemas.sdi,
    certifiedEmail: Schemas.pec.required()
  });
})(Company || (Company = {}));

const Options = ["owner", "person", "company"];

var index$6 = {
	__proto__: null,
	Options: Options,
	get Owner () { return Owner; },
	get Person () { return Person; },
	get Company () { return Company; }
};

var Execute;
(function (Execute) {
  Execute.path = "/pay/execute";
  Execute.method = HTTPMethod.POST;
  Execute.values = {
    paymentId: "",
    billingOption: Options[0],
    owner: Owner.values,
    person: Person.values,
    company: Company.values,
    address: Address.values
  };
  Execute.schema = yup.object({
    paymentId: yup.string().required(),
    billingOption: yup.string().oneOf([...Options]).required(),
    owner: Owner.schema.when("billingOption", Schemas.thenReq(Options[0])),
    person: Person.schema.when("billingOption", Schemas.thenReq(Options[1])),
    company: Company.schema.when("billingOption", Schemas.thenReq(Options[2])),
    address: Address.schema.required()
  });
})(Execute || (Execute = {}));

var Confirm;
(function (Confirm) {
  Confirm.path = "/pay/confirm";
  Confirm.method = HTTPMethod.POST;
  Confirm.schema = yup.object({
    confirmationCode: yup.string().required()
  });
})(Confirm || (Confirm = {}));

var index$5 = {
	__proto__: null,
	get Execute () { return Execute; },
	get Confirm () { return Confirm; }
};

//
var Update;
(function (Update) {
  Update.path = "/admin-enrollments/update";
  Update.method = HTTPMethod.POST;
  Update.itemSchema = yup.object({
    id: yup.string().required(),
    state: yup.string().oneOf(EnrollmentStates).required()
  });
  Update.schema = yup.object({
    changes: yup.array(Update.itemSchema).required()
  });
})(Update || (Update = {}));

var index$4 = {
	__proto__: null,
	get Update () { return Update; }
};

var index$3 = {
	__proto__: null,
	Enrollments: index$4
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var Enroll;
(function (Enroll) {
  Enroll.path = "/enroll";
  Enroll.method = HTTPMethod.POST;
  Enroll.values = {
    courseId: "",
    contacts: Contacts.values,
    evaluation: Evaluation.values
  };
  Enroll.schema = yup.object({
    courseId: yup.string().required(),
    contacts: Contacts.schema.required(),
    evaluation: Evaluation.schema.required()
  });
  function getSchemaCtx(userExists, letterNeeded, portfolioNeeded, cvNeeded) {
    return _extends({}, Contacts.getSchemaCtx(userExists), Evaluation.getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded));
  }
  Enroll.getSchemaCtx = getSchemaCtx;
})(Enroll || (Enroll = {}));

var index$2 = {
	__proto__: null,
	Account: index$7,
	Pay: index$5,
	Admin: index$3,
	get Enroll () { return Enroll; },
	get Contacts () { return Contacts; },
	get Evaluation () { return Evaluation; },
	get Address () { return Address; },
	Billing: index$6
};

const errors = {
  policies: {
    noSchemaInConfig: "noSchemaInConfig",
    bodyNotValid: "bodyNotValid"
  },
  missingCourseId: "missingCourseId",
  courseNotFound: "courseNotFound",
  emailAlreadyExisting: "emailAlreadyExisting",
  alreadyEnrolled: "alreadyEnrolled",
  pastDeadline: "pastDeadline",
  userNotCreated: "userNotCreated",
  badPolicyConfig: "badPolicyConfig",
  defaultRoleNotFound: "defaultRoleNotFound",
  emailSendError: "emailSendError",
  emailTaken: "emailTaken",
  enrollmentExpired: "enrollmentExpired",
  internalServerError: "internalServerError",
  invalidRequestBody: "invalidRequestBody",
  invalidRole: "invalidRole",
  missingCourseID: "missingCourseID",
  missingUserInfo: "missingUserInfo",
  noSchemaProvidedInPolicyConfig: "noSchemaProvidedInPolicyConfig",
  notFound: "notFound",
  passwordThreeDollars: "passwordThreeDollars",
  paymentAlreadyConfirmed: "paymentAlreadyConfirmed",
  paymentAlreadyExecuted: "paymentAlreadyExecuted",
  paymentExpired: "paymentExpired",
  paymentNotFound: "paymentNotFound",
  registerDisabled: "registerDisabled",
  unknownError: "unknownError",
  userExists: "userExists",
  userNotConfirmed: "userNotConfirmed",
  userNotFound: "userNotFound",
  validationError: "validationError"
};

var Course;
(function (Course) {
  function getEvaluationSchemaCtx(c) {
    return {
      cvNeeded: c.cvNeeded,
      letterNeeded: c.motivationalLetterNeeded,
      portfolioNeeded: c.portfolioNeeded
    };
  }
  Course.getEvaluationSchemaCtx = getEvaluationSchemaCtx;
  function isPaymentNeeded(c) {
    return c.price > 0;
  }
  Course.isPaymentNeeded = isPaymentNeeded;
})(Course || (Course = {}));

var Payment;
(function (Payment) {
  function isExpired(date) {
    return new Date() > new Date(date);
  }
  Payment.isExpired = isExpired;
})(Payment || (Payment = {}));

var index$1 = {
	__proto__: null,
	get Course () { return Course; },
	get Payment () { return Payment; }
};

const formatPriceNumber = (price, locale = "IT-it", currency = "EUR") => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  });
  return formatter.format(price);
};
function formatDate(date, locale = "IT-it") {
  return date.toLocaleDateString(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit"
  });
}

var index = {
	__proto__: null,
	formatPriceNumber: formatPriceNumber,
	formatDate: formatDate
};

export { errors, index as formatters, index$1 as helpers, index$2 as routes, index$9 as types, index$a as validation };
//# sourceMappingURL=index.modern.js.map
