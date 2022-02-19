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

var re = {
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
};
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
 * Util
 */

var urlVal = yup__namespace.string().matches(re.url);
var cfVal = yup__namespace.string().matches(re.cf);
/**
 * User
 */

var userVal = yup__namespace.object({
  exists: yup__namespace["boolean"]().required(),
  data: yup__namespace.object({
    email: yup__namespace.string().email().required(),
    name: yup__namespace.string().required(),
    surname: yup__namespace.string().required()
  }).when("exists", thenReq(false))
});
/**
 * Phone
 */

var phoneVal = yup__namespace.string().required();
/**
 * Evaluation
 */

var evaluationVal = yup__namespace.object({
  letterNeeded: yup__namespace["boolean"]().required(),
  letter: yup__namespace.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup__namespace["boolean"]().required(),
  portfolio: urlVal.when("portfolioNeeded", thenReq(true)),
  cvNeeded: yup__namespace["boolean"]().required(),
  cv: urlVal.when("cvNeeded", thenReq(true))
});
/**
 * Address
 */

var addressVal = yup__namespace.object({
  cap: yup__namespace.string().required(),
  town: yup__namespace.string().required(),
  province: yup__namespace.string().required(),
  street: yup__namespace.string().required()
});
/**
 * Billing
 */

var billingOptions = ["me", "person", "company"];
var billingVal = yup__namespace.object({
  billingOption: yup__namespace.string().oneOf(billingOptions).required(),
  // Me
  me: yup__namespace.object({
    cf: cfVal
  }).when("billingOption", thenReq(billingOptions[0])),
  // Persona fisica
  person: yup__namespace.object({
    name: yup__namespace.string().required(),
    surname: yup__namespace.string().required(),
    cf: cfVal
  }).when("billingOption", thenReq(billingOptions[1])),
  // Azienda
  company: yup__namespace.object({
    name: yup__namespace.string().required(),
    vat: yup__namespace.string().required(),
    sdi: yup__namespace.string().required()
  }).when("billingOption", thenReq(billingOptions[2])),
  // Generici
  email: yup__namespace.string().email().when("billingOption", thenNull(billingOptions[0])),
  address: addressVal.required()
});
/**
 * Enrollment
 */

var enrollVal = yup__namespace.object({
  courseId: yup__namespace.number().required(),
  user: userVal.required(),
  phone: phoneVal.required(),
  evaluationNeeded: yup__namespace["boolean"]().required(),
  evaluation: evaluationVal.when("evaluationNeeded", thenReq(true)),
  billingNeeded: yup__namespace["boolean"]().required(),
  billing: billingVal.when("billingNeeded", thenReq(true))
}).required();

var index = {
  __proto__: null,
  urlVal: urlVal,
  cfVal: cfVal,
  userVal: userVal,
  phoneVal: phoneVal,
  evaluationVal: evaluationVal,
  addressVal: addressVal,
  billingOptions: billingOptions,
  billingVal: billingVal,
  enrollVal: enrollVal
};

exports.validators = index;
//# sourceMappingURL=index.cjs.map
