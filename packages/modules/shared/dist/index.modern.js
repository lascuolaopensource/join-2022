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

var index$c = {
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
/**
 * Roles
 */
var UserPermissionRoles;
(function (UserPermissionRoles) {
  UserPermissionRoles["Public"] = "public";
  UserPermissionRoles["Authenticated"] = "authenticated";
  UserPermissionRoles["AdminEnrollments"] = "admin_enrollments";
  UserPermissionRoles["AdminTools"] = "admin_tools";
})(UserPermissionRoles || (UserPermissionRoles = {}));

var HTTPMethod$1;
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
})(HTTPMethod$1 || (HTTPMethod$1 = {}));

var index$b = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod$1; },
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	EnrollmentStates: EnrollmentStates,
	get UserPermissionRoles () { return UserPermissionRoles; }
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

/**
 * Type utilities
 */
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

var types = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod; }
};

// Send function
async function send$b({
  method,
  path,
  data,
  auth,
  fetchImpl = fetch
}) {
  const opts = {
    method,
    headers: {}
  };
  if (data && method != HTTPMethod.GET) {
    opts.headers["Content-Type"] = "application/json";
    opts.body = JSON.stringify(data);
  }
  if (auth) {
    opts.headers["Authorization"] = auth;
  }
  const res = await fetchImpl(path, opts);
  try {
    const _data = await res.json();
    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      data: res.ok ? _data : null,
      error: !res.ok ? _data : null
    };
  } catch (e) {
    throw new Error(`Failed to parse response: ${e}`);
  }
}

var request = {
	__proto__: null,
	send: send$b
};

const backendURL = "http://localhost:1337/api";
async function send$a(args) {
  const argsCopy = _extends({}, args);
  argsCopy.path = `${backendURL}${args.path}`;
  if (args.auth) argsCopy.auth = `Bearer ${args.auth}`;
  return await send$b(_extends({}, argsCopy));
}

var index$a = {
	__proto__: null,
	backendURL: backendURL,
	send: send$a
};

//
const path$9 = "/account/register";
const method$9 = HTTPMethod$1.POST;
const values$6 = {
  name: "",
  surname: "",
  email: "",
  password: ""
};
const schema$8 = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: Schemas.email.required(),
  password: yup.string().required()
}).required();
async function send$9(data, fetchImpl = fetch) {
  return send$a({
    path: path$9,
    method: method$9,
    data,
    fetchImpl
  });
}

var register = {
	__proto__: null,
	path: path$9,
	method: method$9,
	values: values$6,
	schema: schema$8,
	send: send$9
};

var UserExists;
(function (UserExists) {
  UserExists.path = "/account/user-exists";
  UserExists.method = HTTPMethod$1.POST;
  UserExists.values = {
    email: ""
  };
  UserExists.schema = yup.object({
    email: Schemas.email.required()
  }).required();
})(UserExists || (UserExists = {}));

//
const path$8 = "/auth/local";
const method$8 = HTTPMethod.POST;
const values$5 = {
  identifier: "",
  password: ""
};
const schema$7 = yup.object({
  identifier: Schemas.email.required(),
  password: yup.string().required()
}).required();
async function send$8(data, fetchImpl = fetch) {
  return send$a({
    path: path$8,
    method: method$8,
    data,
    fetchImpl
  });
}

var login = {
	__proto__: null,
	path: path$8,
	method: method$8,
	values: values$5,
	schema: schema$7,
	send: send$8
};

//
const path$7 = "/auth/forgot-password";
const method$7 = HTTPMethod$1.POST;
const values$4 = {
  email: ""
};
const schema$6 = yup.object({
  email: Schemas.email.required()
}).required();
async function send$7(data, fetchImpl = fetch) {
  return send$a({
    path: path$7,
    method: method$7,
    data,
    fetchImpl
  });
}

var forgot = {
	__proto__: null,
	path: path$7,
	method: method$7,
	values: values$4,
	schema: schema$6,
	send: send$7
};

//
const path$6 = "/auth/reset-password";
const method$6 = HTTPMethod$1.POST;
const values$3 = {
  password: "string",
  passwordConfirmation: "string",
  code: "string"
};
const schema$5 = yup.object({
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
  code: yup.string().required()
}).required();
async function send$6(data, fetchImpl = fetch) {
  return send$a({
    path: path$6,
    method: method$6,
    data,
    fetchImpl
  });
}

var reset = {
	__proto__: null,
	path: path$6,
	method: method$6,
	values: values$3,
	schema: schema$5,
	send: send$6
};

var index$9 = {
	__proto__: null,
	Forgot: forgot,
	Reset: reset
};

const path$5 = "/users/me?populate=info&populate=role";
const method$5 = HTTPMethod.GET;
async function send$5(token, fetchImpl = fetch) {
  return send$a({
    path: path$5,
    method: method$5,
    auth: token,
    fetchImpl
  });
}

var me = {
	__proto__: null,
	path: path$5,
	method: method$5,
	send: send$5
};

var index$8 = {
	__proto__: null,
	Register: register,
	Login: login,
	Password: index$9,
	Me: me,
	get UserExists () { return UserExists; }
};

const values$2 = {
  email: "",
  name: "",
  surname: "",
  phone: ""
};
const USER_EXISTS = "$userExists";
const schema$4 = yup.object({
  email: yup.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
  name: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
  surname: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
  phone: Schemas.phone.required()
});
function getSchemaCtx$1(userExists) {
  return {
    userExists
  };
}

var contacts = {
	__proto__: null,
	values: values$2,
	schema: schema$4,
	getSchemaCtx: getSchemaCtx$1
};

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

var index$7 = {
	__proto__: null,
	Options: Options,
	get Owner () { return Owner; },
	get Person () { return Person; },
	get Company () { return Company; }
};

const path$4 = (params = {
  id: ":id"
}) => `/pay/execute/${params.id}`;
const method$4 = HTTPMethod$1.POST;
const values$1 = {
  billingOption: Options[0],
  owner: Owner.values,
  person: Person.values,
  company: Company.values,
  address: Address.values
};
const schema$3 = yup.object({
  billingOption: yup.string().oneOf([...Options]).required(),
  owner: Owner.schema.when("billingOption", Schemas.thenReq(Options[0])),
  person: Person.schema.when("billingOption", Schemas.thenReq(Options[1])),
  company: Company.schema.when("billingOption", Schemas.thenReq(Options[2])),
  address: Address.schema.required()
});
async function send$4(paymentID, data, fetchImpl = fetch) {
  return send$a({
    path: path$4({
      id: paymentID
    }),
    method: method$4,
    data,
    fetchImpl
  });
}

var execute = {
	__proto__: null,
	path: path$4,
	method: method$4,
	values: values$1,
	schema: schema$3,
	send: send$4
};

const path$3 = (params = {
  id: ":id"
}) => `/pay/get-info/${params.id}`;
const method$3 = HTTPMethod$1.GET;
async function send$3(id, fetchImpl = fetch) {
  return send$a({
    path: path$3({
      id
    }),
    method: method$3,
    fetchImpl
  });
}

var getInfo = {
	__proto__: null,
	path: path$3,
	method: method$3,
	send: send$3
};

//
const path$2 = "/pay/confirm";
const method$2 = HTTPMethod$1.POST;
const schema$2 = yup.object({
  confirmationCode: yup.string().required()
});
async function send$2(confirmationCode, fetchImpl = fetch) {
  return send$a({
    path: path$2,
    method: method$2,
    data: {
      confirmationCode
    },
    fetchImpl
  });
}

var confirm = {
	__proto__: null,
	path: path$2,
	method: method$2,
	schema: schema$2,
	send: send$2
};

var index$6 = {
	__proto__: null,
	Execute: execute,
	GetInfo: getInfo,
	Confirm: confirm
};

//
const path$1 = "/admin-enrollments/update";
const method$1 = HTTPMethod$1.POST;
const itemSchema = yup.object({
  id: yup.string().required(),
  state: yup.string().oneOf(EnrollmentStates).required()
});
const schema$1 = yup.object({
  items: yup.array(itemSchema).required()
});
async function send$1(data, auth, fetchImpl = fetch) {
  return send$a({
    path: path$1,
    method: method$1,
    data,
    fetchImpl,
    auth
  });
}

var update = {
	__proto__: null,
	path: path$1,
	method: method$1,
	itemSchema: itemSchema,
	schema: schema$1,
	send: send$1
};

var index$5 = {
	__proto__: null,
	Update: update
};

var index$4 = {
	__proto__: null,
	Enrollments: index$5
};

//
const path = (id = ":id") => `/enroll/${id}`;
const method = HTTPMethod$1.POST;
const values = {
  contacts: values$2,
  evaluation: Evaluation.values
};
const schema = yup.object({
  contacts: schema$4.required(),
  evaluation: Evaluation.schema.required()
});
function getSchemaCtx(userExists, letterNeeded, portfolioNeeded, cvNeeded) {
  return _extends({}, getSchemaCtx$1(userExists), Evaluation.getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded));
}
async function send(courseID, data, token = null, fetchImpl = fetch) {
  return send$a({
    path: path(courseID),
    method,
    data,
    fetchImpl,
    auth: token
  });
}

var index$3 = {
	__proto__: null,
	path: path,
	method: method,
	values: values,
	schema: schema,
	getSchemaCtx: getSchemaCtx,
	send: send
};

var index$2 = {
	__proto__: null,
	Account: index$8,
	Pay: index$6,
	Admin: index$4,
	Enroll: index$3,
	get Evaluation () { return Evaluation; },
	get Address () { return Address; },
	Contacts: contacts,
	Billing: index$7
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

//
function getEvaluationSchemaCtx(c) {
  return {
    cvNeeded: c.cvNeeded,
    letterNeeded: c.motivationalLetterNeeded,
    portfolioNeeded: c.portfolioNeeded
  };
}
function isPaymentNeeded(c) {
  return c.price > 0;
}
function hasDeadlinePassed(c) {
  return Date.now() > Date.parse(c.enrollmentDeadline);
}
function getFirstMeeting(c) {
  return c.meetings[0];
}
function getStart(c) {
  var _getFirstMeeting;
  return new Date((_getFirstMeeting = getFirstMeeting(c)) == null ? void 0 : _getFirstMeeting.start);
}
function isEvaluationTime(c) {
  return Date.now() > Date.parse(c.enrollmentDeadline) && new Date() < getStart(c);
}
function canEditEnrollments(c) {
  return isEvaluationTime(c) && !c.confirmed;
}

var course = {
	__proto__: null,
	getEvaluationSchemaCtx: getEvaluationSchemaCtx,
	isPaymentNeeded: isPaymentNeeded,
	hasDeadlinePassed: hasDeadlinePassed,
	getFirstMeeting: getFirstMeeting,
	getStart: getStart,
	isEvaluationTime: isEvaluationTime,
	canEditEnrollments: canEditEnrollments
};

var Payment;
(function (Payment) {
  function isExpired(date) {
    return new Date() > new Date(date);
  }
  Payment.isExpired = isExpired;
})(Payment || (Payment = {}));

function getItem(e) {
  return {
    id: e.id,
    state: e.attributes.state
  };
}
function getItems(es) {
  return es.map(getItem);
}

var enrollment = {
	__proto__: null,
	getItem: getItem,
	getItems: getItems
};

var index$1 = {
	__proto__: null,
	Course: course,
	Enrollment: enrollment,
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
  let d;
  if (typeof date === "string") {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  }
  return d.toLocaleDateString(locale, {
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

export { types as Request, errors, index as formatters, index$1 as helpers, index$a as jr, request, index$2 as routes, index$b as types, index$c as validation };
//# sourceMappingURL=index.modern.js.map
