var yup = require('yup');

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
  Schemas.url = yup__namespace.string().lowercase().matches(Regex.url);
  Schemas.cf = yup__namespace.string().uppercase().matches(Regex.cf);
  Schemas.vat = yup__namespace.string().matches(Regex.vat);
  Schemas.sdi = yup__namespace.string().uppercase().matches(Regex.sdi);
  Schemas.phone = yup__namespace.string().matches(Regex.phone);
  Schemas.email = yup__namespace.string().email();
  Schemas.pec = Schemas.email.matches(Regex.pec);
  Schemas.provincia = yup__namespace.string().uppercase().matches(Regex.provincia);
  Schemas.cap = yup__namespace.string().matches(Regex.cap);
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
  Schemas.thenReq = thenReq;
  function thenUrlReq(value) {
    return {
      is: value,
      then: function then(schema) {
        return Schemas.url.required();
      },
      otherwise: function otherwise(schema) {
        return schema.nullable().optional();
      }
    };
  }
  Schemas.thenUrlReq = thenUrlReq;
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
  Schemas.thenNull = thenNull;
  Schemas.nullOrReq = {
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
var EnrollmentStates = Object.values(Enum_Enrollment_State);
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

var index$9 = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod$1; },
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	EnrollmentStates: EnrollmentStates
};

var Create;
(function (Create) {
  Create.path = "/account/create";
  Create.method = HTTPMethod$1.POST;
  Create.values = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };
  Create.schema = yup__namespace.object({
    name: yup__namespace.string().required(),
    surname: yup__namespace.string().required(),
    email: Schemas.email.required(),
    password: yup__namespace.string().required()
  }).required();
})(Create || (Create = {}));

var UserExists;
(function (UserExists) {
  UserExists.path = "/account/user-exists";
  UserExists.method = HTTPMethod$1.POST;
  UserExists.values = {
    email: ""
  };
  UserExists.schema = yup__namespace.object({
    email: Schemas.email.required()
  }).required();
})(UserExists || (UserExists = {}));

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

// Error handler

// Send function
var send$2 = function send(_ref) {
  var method = _ref.method,
    path = _ref.path,
    data = _ref.data,
    auth = _ref.auth,
    _ref$fetchImpl = _ref.fetchImpl,
    fetchImpl = _ref$fetchImpl === void 0 ? fetch : _ref$fetchImpl,
    _ref$errorHandler = _ref.errorHandler,
    errorHandler = _ref$errorHandler === void 0 ? defaultErrorHandler : _ref$errorHandler;
  try {
    var opts = {
      method: method,
      headers: {}
    };
    if (data && method != HTTPMethod.GET) {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(data);
    }
    if (auth) {
      opts.headers["Authorization"] = auth;
    }
    return Promise.resolve(fetchImpl(path, opts)).then(function (res) {
      var _exit;
      function _temp3(_result) {
        return _exit ? _result : Promise.resolve(errorHandler(res)).then(function (_errorHandler) {
          throw _errorHandler;
        });
      }
      var _temp2 = function () {
        if (res.ok || res.status === 422) {
          return Promise.resolve(res.text()).then(function (text) {
            var _temp = text ? JSON.parse(text) : {};
            _exit = 1;
            return _temp; // TODO: Fix – Fails in case response is not JSON.
          });
        }
      }();
      return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var defaultErrorHandler = function defaultErrorHandler(res) {
  try {
    return Promise.resolve(new Error(res.statusText));
  } catch (e) {
    return Promise.reject(e);
  }
};

var request = {
	__proto__: null,
	send: send$2,
	defaultErrorHandler: defaultErrorHandler
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

var send$1 = function send(args) {
  try {
    var argsCopy = _extends({}, args);
    argsCopy.errorHandler = errorHandler;
    argsCopy.path = backendURL + "/" + args.path;
    if (args.auth) argsCopy.auth = "Bearer " + args.auth;
    console.log(argsCopy);
    return Promise.resolve(send$2(_extends({}, argsCopy)));
  } catch (e) {
    return Promise.reject(e);
  }
};
var backendURL = "http://localhost:1337/api";
var errorHandler = function errorHandler(res) {
  try {
    return Promise.resolve(res.json()).then(function (data) {
      var _data$error, _data$message, _data$message$, _data$message$$messag, _data$message$$messag2;
      var message = (data == null ? void 0 : (_data$error = data.error) == null ? void 0 : _data$error.message) || (data == null ? void 0 : (_data$message = data.message) == null ? void 0 : (_data$message$ = _data$message[0]) == null ? void 0 : (_data$message$$messag = _data$message$.messages) == null ? void 0 : (_data$message$$messag2 = _data$message$$messag[0]) == null ? void 0 : _data$message$$messag2.message) || (data == null ? void 0 : data.message) || res.statusText || "Unknown error: " + res.status;
      return new Error(message);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

//

var send = function send(data, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$1({
      path: path,
      method: method,
      data: data,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path = "auth/local";
var method = HTTPMethod.POST;
var values = {
  identifier: "",
  password: ""
};
var schema = yup__namespace.object({
  identifier: Schemas.email.required(),
  password: yup__namespace.string().required()
}).required();

var login = {
	__proto__: null,
	send: send,
	path: path,
	method: method,
	values: values,
	schema: schema
};

var Forgot;
(function (Forgot) {
  Forgot.path = "/auth/forgot-password";
  Forgot.method = HTTPMethod$1.POST;
  Forgot.values = {
    email: ""
  };
  Forgot.schema = yup__namespace.object({
    email: Schemas.email.required()
  }).required();
})(Forgot || (Forgot = {}));

var Reset;
(function (Reset) {
  Reset.path = "/auth/reset-password";
  Reset.method = HTTPMethod$1.POST;
  Reset.values = {
    password: "string",
    passwordConfirmation: "string",
    code: "string"
  };
  Reset.schema = yup__namespace.object({
    password: yup__namespace.string().required(),
    passwordConfirmation: yup__namespace.string().required(),
    code: yup__namespace.string().required()
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
  var USER_EXISTS = "$userExists";
  Contacts.schema = yup__namespace.object({
    email: yup__namespace.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
    name: yup__namespace.string().when(USER_EXISTS, Schemas.thenReq(false)),
    surname: yup__namespace.string().when(USER_EXISTS, Schemas.thenReq(false)),
    phone: Schemas.phone.required()
  });
  function getSchemaCtx(userExists) {
    return {
      userExists: userExists
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
  Evaluation.schema = yup__namespace.object({
    letter: yup__namespace.string().when("$letterNeeded", Schemas.thenReq(true)),
    portfolio: yup__namespace.string().when("$portfolioNeeded", Schemas.thenUrlReq(true)),
    cv: yup__namespace.string().when("$cvNeeded", Schemas.thenUrlReq(true))
  });
  function getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded) {
    return {
      letterNeeded: letterNeeded,
      portfolioNeeded: portfolioNeeded,
      cvNeeded: cvNeeded
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
  Address.schema = yup__namespace.object({
    country: yup__namespace.string().required(),
    administrativeArea: Schemas.provincia.required(),
    city: yup__namespace.string().required(),
    postCode: Schemas.cap.required(),
    street: yup__namespace.string().required(),
    number: yup__namespace.string().required()
  });
})(Address || (Address = {}));

//
var Owner;
(function (Owner) {
  Owner.values = {
    fiscalCode: ""
  };
  Owner.schema = yup__namespace.object({
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
  Person.schema = yup__namespace.object({
    name: yup__namespace.string().required(),
    surname: yup__namespace.string().required(),
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
  Company.schema = yup__namespace.object({
    name: yup__namespace.string().required(),
    vatNumber: Schemas.vat.required(),
    sdiCode: Schemas.sdi,
    certifiedEmail: Schemas.pec.required()
  });
})(Company || (Company = {}));

var Options = ["owner", "person", "company"];

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
  Execute.method = HTTPMethod$1.POST;
  Execute.values = {
    paymentId: "",
    billingOption: Options[0],
    owner: Owner.values,
    person: Person.values,
    company: Company.values,
    address: Address.values
  };
  Execute.schema = yup__namespace.object({
    paymentId: yup__namespace.string().required(),
    billingOption: yup__namespace.string().oneOf([].concat(Options)).required(),
    owner: Owner.schema.when("billingOption", Schemas.thenReq(Options[0])),
    person: Person.schema.when("billingOption", Schemas.thenReq(Options[1])),
    company: Company.schema.when("billingOption", Schemas.thenReq(Options[2])),
    address: Address.schema.required()
  });
})(Execute || (Execute = {}));

var Confirm;
(function (Confirm) {
  Confirm.path = "/pay/confirm";
  Confirm.method = HTTPMethod$1.POST;
  Confirm.schema = yup__namespace.object({
    confirmationCode: yup__namespace.string().required()
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
  Update.method = HTTPMethod$1.POST;
  Update.itemSchema = yup__namespace.object({
    id: yup__namespace.string().required(),
    state: yup__namespace.string().oneOf(EnrollmentStates).required()
  });
  Update.schema = yup__namespace.object({
    changes: yup__namespace.array(Update.itemSchema).required()
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

var Enroll;
(function (Enroll) {
  Enroll.path = "/enroll";
  Enroll.method = HTTPMethod$1.POST;
  Enroll.values = {
    courseId: "",
    contacts: Contacts.values,
    evaluation: Evaluation.values
  };
  Enroll.schema = yup__namespace.object({
    courseId: yup__namespace.string().required(),
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

var errors = {
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

var formatPriceNumber = function formatPriceNumber(price, locale, currency) {
  if (locale === void 0) {
    locale = "IT-it";
  }
  if (currency === void 0) {
    currency = "EUR";
  }
  var formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  });
  return formatter.format(price);
};
function formatDate(date, locale) {
  if (locale === void 0) {
    locale = "IT-it";
  }
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

exports.Request = types;
exports.backendURL = backendURL;
exports.errorHandler = errorHandler;
exports.errors = errors;
exports.formatters = index;
exports.helpers = index$1;
exports.request = request;
exports.routes = index$2;
exports.send = send$1;
exports.types = index$9;
exports.validation = index$a;
//# sourceMappingURL=index.cjs.map
