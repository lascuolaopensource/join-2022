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

var index$b = {
	__proto__: null,
	get HTTPMethod () { return HTTPMethod$1; },
	get Enum_Enrollment_State () { return Enum_Enrollment_State; },
	get PublicationState () { return PublicationState; },
	get PaymentCategories () { return PaymentCategories; },
	EnrollmentStates: EnrollmentStates
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

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
var send$7 = function send(_ref) {
  var method = _ref.method,
    path = _ref.path,
    data = _ref.data,
    auth = _ref.auth,
    _ref$fetchImpl = _ref.fetchImpl,
    fetchImpl = _ref$fetchImpl === void 0 ? fetch : _ref$fetchImpl;
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
      return _catch(function () {
        return Promise.resolve(res.json()).then(function (data) {
          return {
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
            data: res.ok ? data : null,
            error: !res.ok ? data : null
          };
        });
      }, function (e) {
        throw new Error("Failed to parse response: " + e);
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

var request = {
	__proto__: null,
	send: send$7
};

var send$6 = function send(args) {
  try {
    var argsCopy = _extends({}, args);
    argsCopy.path = "" + backendURL + args.path;
    if (args.auth) argsCopy.auth = "Bearer " + args.auth;
    return Promise.resolve(send$7(_extends({}, argsCopy)));
  } catch (e) {
    return Promise.reject(e);
  }
};
var backendURL = "http://localhost:1337/api";

var index$a = {
	__proto__: null,
	send: send$6,
	backendURL: backendURL
};

//

var send$5 = function send(data, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path$6,
      method: method$6,
      data: data,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path$6 = "/account/register";
var method$6 = HTTPMethod$1.POST;
var values$6 = {
  name: "",
  surname: "",
  email: "",
  password: ""
};
var schema$6 = yup__namespace.object({
  name: yup__namespace.string().required(),
  surname: yup__namespace.string().required(),
  email: Schemas.email.required(),
  password: yup__namespace.string().required()
}).required();

var register = {
	__proto__: null,
	send: send$5,
	path: path$6,
	method: method$6,
	values: values$6,
	schema: schema$6
};

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

//

var send$4 = function send(data, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path$5,
      method: method$5,
      data: data,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path$5 = "/auth/local";
var method$5 = HTTPMethod.POST;
var values$5 = {
  identifier: "",
  password: ""
};
var schema$5 = yup__namespace.object({
  identifier: Schemas.email.required(),
  password: yup__namespace.string().required()
}).required();

var login = {
	__proto__: null,
	send: send$4,
	path: path$5,
	method: method$5,
	values: values$5,
	schema: schema$5
};

//

var send$3 = function send(data, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path$4,
      method: method$4,
      data: data,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path$4 = "/auth/forgot-password";
var method$4 = HTTPMethod$1.POST;
var values$4 = {
  email: ""
};
var schema$4 = yup__namespace.object({
  email: Schemas.email.required()
}).required();

var forgot = {
	__proto__: null,
	send: send$3,
	path: path$4,
	method: method$4,
	values: values$4,
	schema: schema$4
};

//

var send$2 = function send(data, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path$3,
      method: method$3,
      data: data,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path$3 = "/auth/reset-password";
var method$3 = HTTPMethod$1.POST;
var values$3 = {
  password: "string",
  passwordConfirmation: "string",
  code: "string"
};
var schema$3 = yup__namespace.object({
  password: yup__namespace.string().required(),
  passwordConfirmation: yup__namespace.string().required(),
  code: yup__namespace.string().required()
}).required();

var reset = {
	__proto__: null,
	send: send$2,
	path: path$3,
	method: method$3,
	values: values$3,
	schema: schema$3
};

var index$9 = {
	__proto__: null,
	Forgot: forgot,
	Reset: reset
};

var send$1 = function send(token, fetchImpl) {
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path$2,
      method: method$2,
      auth: token,
      fetchImpl: fetchImpl
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path$2 = "/users/me?populate=info";
var method$2 = HTTPMethod.GET;

var me = {
	__proto__: null,
	send: send$1,
	path: path$2,
	method: method$2
};

var index$8 = {
	__proto__: null,
	Register: register,
	Login: login,
	Password: index$9,
	Me: me,
	get UserExists () { return UserExists; }
};

var values$2 = {
  email: "",
  name: "",
  surname: "",
  phone: ""
};
var USER_EXISTS = "$userExists";
var schema$2 = yup__namespace.object({
  email: yup__namespace.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
  name: yup__namespace.string().when(USER_EXISTS, Schemas.thenReq(false)),
  surname: yup__namespace.string().when(USER_EXISTS, Schemas.thenReq(false)),
  phone: Schemas.phone.required()
});
function getSchemaCtx$1(userExists) {
  return {
    userExists: userExists
  };
}

var contacts = {
	__proto__: null,
	values: values$2,
	schema: schema$2,
	getSchemaCtx: getSchemaCtx$1
};

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

var index$7 = {
	__proto__: null,
	Options: Options,
	get Owner () { return Owner; },
	get Person () { return Person; },
	get Company () { return Company; }
};

/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType$1(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isPlainObject$1(payload) {
    if (getType$1(payload) !== 'Object')
        return false;
    const prototype = Object.getPrototypeOf(payload);
    return prototype.constructor === Object && prototype === Object.prototype;
}
/**
 * Returns whether the payload is a number (but not NaN)
 *
 * This will return `false` for `NaN`!!
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isNumber(payload) {
    return getType$1(payload) === 'Number' && !isNaN(payload);
}

function retrievePaths(object, path, result, untilDepth) {
    if (!isPlainObject$1(object) ||
        !Object.keys(object).length ||
        object.methodName === 'FieldValue.serverTimestamp') {
        if (!path)
            return object;
        result[path] = object;
        return result;
    }
    if (isNumber(untilDepth))
        untilDepth--;
    return Object.keys(object).reduce((carry, key) => {
        const pathUntilNow = path ? path + '.' : '';
        const newPath = pathUntilNow + key;
        // last iteration or not
        const extra = untilDepth === -1
            ? { [newPath]: object[key] }
            : retrievePaths(object[key], newPath, result, untilDepth);
        return Object.assign(carry, extra);
    }, {});
}
/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {Record<string, any>} object the object to flatten
 * @param {untilDepth} [number] how deep you want to flatten. 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {Record<string, any>} the flattened object
 */
function flattenObject(object, untilDepth) {
    const result = {};
    return retrievePaths(object, null, result, untilDepth);
}

/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType(payload) {
  return Object.prototype.toString.call(payload).slice(8, -1);
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is PlainObject}
 */
function isPlainObject(payload) {
  if (getType(payload) !== 'Object') return false;
  return payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype;
}
/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
function isSymbol(payload) {
  return getType(payload) === 'Symbol';
}

function assignProp(carry, key, newVal, originalObject) {
  var propType = {}.propertyIsEnumerable.call(originalObject, key) ? 'enumerable' : 'nonenumerable';
  if (propType === 'enumerable') carry[key] = newVal;
  if (propType === 'nonenumerable') {
    Object.defineProperty(carry, key, {
      value: newVal,
      enumerable: false,
      writable: true,
      configurable: true
    });
  }
}
function mergeRecursively(origin, newComer, compareFn) {
  // always return newComer if its not an object
  if (!isPlainObject(newComer)) return newComer;
  // define newObject to merge all values upon
  var newObject = {};
  if (isPlainObject(origin)) {
    var _props = Object.getOwnPropertyNames(origin);
    var _symbols = Object.getOwnPropertySymbols(origin);
    newObject = [].concat(_props, _symbols).reduce(function (carry, key) {
      var targetVal = origin[key];
      if (!isSymbol(key) && !Object.getOwnPropertyNames(newComer).includes(key) || isSymbol(key) && !Object.getOwnPropertySymbols(newComer).includes(key)) {
        assignProp(carry, key, targetVal, origin);
      }
      return carry;
    }, {});
  }
  // newObject has all properties that newComer hasn't
  var props = Object.getOwnPropertyNames(newComer);
  var symbols = Object.getOwnPropertySymbols(newComer);
  var result = [].concat(props, symbols).reduce(function (carry, key) {
    // re-define the origin and newComer as targetVal and newVal
    var newVal = newComer[key];
    var targetVal = isPlainObject(origin) ? origin[key] : undefined;
    // When newVal is an object do the merge recursively
    if (targetVal !== undefined && isPlainObject(newVal)) {
      newVal = mergeRecursively(targetVal, newVal, compareFn);
    }
    var propToAssign = compareFn ? compareFn(targetVal, newVal, key) : newVal;
    assignProp(carry, key, propToAssign, newComer);
    return carry;
  }, newObject);
  return result;
}
/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 * @param object
 * @param otherObjects
 */
function merge(object) {
  return [].slice.call(arguments, 1).reduce(function (result, newComer) {
    return mergeRecursively(result, newComer);
  }, object);
}

/**
 * creates an object from a path
 *
 * @param {string} path a.path.like.this
 * @param {unknown} payload the value to attach to the nested prop
 * @returns {Record<string, unknown>} eg. `{a: {path: {like: {this: 'payload'}}}}`
 */
function createObjectFromPath(path, payload) {
  var _ref;
  // edge cases
  if (!path.includes('.')) return _ref = {}, _ref[path] = payload, _ref;
  // start
  var newValue = payload;
  // important to set the result here and not return the reduce directly!
  var result = {};
  var matches = path.match(/[^.]+/g) || [];
  matches.reduce(function (carry, _prop, index, array) {
    _prop = _prop.replace('_____dot_____', '.');
    var container = index === array.length - 1 ? newValue : {};
    carry[_prop] = container;
    return container;
  }, result);
  return result;
}
/**
 * Recreates an object from any `nested.props` in a passed target object.
 *
 * @param {Record<string, unknown>} payload object with flat prop paths - eg. `{ 'size.h': 0, 'size.w': 0 }`
 * @returns {Record<string, unknown>} object with nested props - eg. `{ size: { h: 0, w: 0 } }`
 * @example
 * const result = nestifyObject({ 'size.h': 0, 'size.w': 0 })
 * // result is:
 * { size: { h: 0, w: 0 } }
 */
function nestifyObject(payload) {
  return Object.entries(payload).reduce(function (carry, _ref2) {
    var key = _ref2[0],
      value = _ref2[1];
    var nestedObject = createObjectFromPath(key, value);
    return merge(carry, nestedObject);
  }, {});
}

//
var path$1 = function path(id) {
  if (id === void 0) {
    id = ":id";
  }
  return "/pay/execute/" + id;
};
var method$1 = HTTPMethod$1.POST;
var values$1 = {
  billingOption: Options[0],
  owner: Owner.values,
  person: Person.values,
  company: Company.values,
  address: Address.values
};
function listKeys(record) {
  var list = {};
  for (var _i = 0, _Object$keys = Object.keys(record); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    list[key] = key;
  }
  return list;
}
console.log(nestifyObject(listKeys(flattenObject(values$1))));
var schema$1 = yup__namespace.object({
  billingOption: yup__namespace.string().oneOf([].concat(Options)).required(),
  owner: Owner.schema.when("billingOption", Schemas.thenReq(Options[0])),
  person: Person.schema.when("billingOption", Schemas.thenReq(Options[1])),
  company: Company.schema.when("billingOption", Schemas.thenReq(Options[2])),
  address: Address.schema.required()
});

var execute = {
	__proto__: null,
	path: path$1,
	method: method$1,
	values: values$1,
	schema: schema$1
};

var Confirm;
(function (Confirm) {
  Confirm.path = "/pay/confirm";
  Confirm.method = HTTPMethod$1.POST;
  Confirm.schema = yup__namespace.object({
    confirmationCode: yup__namespace.string().required()
  });
})(Confirm || (Confirm = {}));

var index$6 = {
	__proto__: null,
	Execute: execute,
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

var index$5 = {
	__proto__: null,
	get Update () { return Update; }
};

var index$4 = {
	__proto__: null,
	Enrollments: index$5
};

//

var send = function send(courseID, data, token, fetchImpl) {
  if (token === void 0) {
    token = null;
  }
  try {
    if (fetchImpl === undefined) fetchImpl = fetch;
    return Promise.resolve(send$6({
      path: path(courseID),
      method: method,
      data: data,
      fetchImpl: fetchImpl,
      auth: token
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var path = function path(id) {
  if (id === void 0) {
    id = ":id";
  }
  return "/enroll/" + id;
};
var method = HTTPMethod$1.POST;
var values = {
  contacts: values$2,
  evaluation: Evaluation.values
};
var schema = yup__namespace.object({
  contacts: schema$2.required(),
  evaluation: Evaluation.schema.required()
});
function getSchemaCtx(userExists, letterNeeded, portfolioNeeded, cvNeeded) {
  return _extends({}, getSchemaCtx$1(userExists), Evaluation.getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded));
}

var index$3 = {
	__proto__: null,
	send: send,
	path: path,
	method: method,
	values: values,
	schema: schema,
	getSchemaCtx: getSchemaCtx
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

var course = {
	__proto__: null,
	getEvaluationSchemaCtx: getEvaluationSchemaCtx,
	isPaymentNeeded: isPaymentNeeded,
	hasDeadlinePassed: hasDeadlinePassed
};

var Payment;
(function (Payment) {
  function isExpired(date) {
    return new Date() > new Date(date);
  }
  Payment.isExpired = isExpired;
})(Payment || (Payment = {}));

var index$1 = {
	__proto__: null,
	Course: course,
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
  var d;
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

exports.Request = types;
exports.errors = errors;
exports.formatters = index;
exports.helpers = index$1;
exports.jr = index$a;
exports.request = request;
exports.routes = index$2;
exports.types = index$b;
exports.validation = index$c;
//# sourceMappingURL=index.cjs.map
