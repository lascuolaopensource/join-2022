(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('yup'), require('graphql-tag')) :
    typeof define === 'function' && define.amd ? define(['exports', 'yup', 'graphql-tag'], factory) :
    (global = global || self, factory(global.shared = {}, global.yup, global.graphqlTag));
})(this, (function (exports, yup, graphqlTag) {
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

    var re$1 = {
      url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
    };
    var urlSchema = yup__namespace.string().matches(re$1.url);
    var cfSchema = yup__namespace.string().uppercase().matches(re$1.cf);
    var emailSchema$1 = yup__namespace.string().email();
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

    /**
     * LoginEmail
     */

    var leValues = {
      email: ""
    };
    var leSchema = yup__namespace.object({
      email: emailSchema$1.required()
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
    var lpSchema = yup__namespace.object({
      password: yup__namespace.string().required()
    });

    var loginPassword = {
        __proto__: null,
        lpValues: lpValues,
        lpSchema: lpSchema
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
    var cSchema = yup__namespace.object({
      exists: yup__namespace["boolean"]().required(),
      user: yup__namespace.object({
        email: yup__namespace.string().email().required(),
        name: yup__namespace.string().required(),
        surname: yup__namespace.string().required()
      }).when("exists", thenReq(false)),
      phone: yup__namespace.string().required()
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
    var evSchema = yup__namespace.object({
      letterNeeded: yup__namespace["boolean"]().required(),
      letter: yup__namespace.string().when("letterNeeded", thenReq(true)),
      portfolioNeeded: yup__namespace["boolean"]().required(),
      portfolio: yup__namespace.string().when("portfolioNeeded", thenUrlReq(true)),
      cvNeeded: yup__namespace["boolean"]().required(),
      cv: yup__namespace.string().when("cvNeeded", thenUrlReq(true))
    });

    var evaluation = {
        __proto__: null,
        evValues: evValues,
        evSchema: evSchema
    };

    /**
     * Enrollment form
     */

    var enValues = {
      courseId: "",
      contacts: cValues,
      evaluation: evValues
    };
    var enSchema = yup__namespace.object({
      courseId: yup__namespace.string().required(),
      contacts: cSchema,
      evaluation: evSchema
    });

    var enroll = {
        __proto__: null,
        enValues: enValues,
        enSchema: enSchema
    };

    /**
     * Me
     */

    var bMeValues = {
      cf: ""
    };
    var bMeSchema = yup__namespace.object({
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
    var bPersonSchema = yup__namespace.object({
      name: yup__namespace.string().required(),
      surname: yup__namespace.string().required(),
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
    var bCompanySchema = yup__namespace.object({
      name: yup__namespace.string().required(),
      vat: yup__namespace.string().required(),
      sdi: yup__namespace.string()
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
    var bAddressSchema = yup__namespace.object({
      cap: yup__namespace.string().required(),
      town: yup__namespace.string().required(),
      province: yup__namespace.string().required(),
      street: yup__namespace.string().required()
    });
    /**
     * Billing options
     */

    var bOptions = ["me", "person", "company"]; // Lista dei componenti per la zona dinamica
    // Reference: strapi-backend/src/api/billing-info/content-types/billing-info/schema.json

    var bOptionsComp = {
      company: "billing.company",
      person: "billing.person",
      me: "billing.me"
    };
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
    var bSchema = yup__namespace.object({
      // Modalità
      billingOption: yup__namespace.string().oneOf(bOptions).required(),
      // Me
      me: bMeSchema.when("billingOption", thenReq(bOptions[0])),
      person: bPersonSchema.when("billingOption", thenReq(bOptions[1])),
      company: bCompanySchema.when("billingOption", thenReq(bOptions[2])),
      // Generici
      email: yup__namespace.string().email().when("billingOption", thenNull(bOptions[0])),
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

    var pSchema = yup__namespace.object({
      paymentHash: yup__namespace.string(),
      billing: bSchema.required()
    });
    /**
     * Payment confirmation
     */

    var pConfirmSchema = yup__namespace.object({
      confirmCode: yup__namespace.string().required()
    });

    var payment = {
        __proto__: null,
        pSchema: pSchema,
        pConfirmSchema: pConfirmSchema
    };

    var index$5 = {
        __proto__: null,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        enroll: enroll,
        billing: billing,
        contacts: contacts,
        evaluation: evaluation,
        payment: payment
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

    var index$4 = {
        __proto__: null,
        get Enum_Enrollment_State () { return Enum_Enrollment_State; },
        get PublicationState () { return PublicationState; },
        get PaymentCategories () { return PaymentCategories; }
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

    var index$3 = {
        __proto__: null,
        course: course
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

    var index$2 = {
        __proto__: null,
        getCoursePageBySlug: getCoursePageBySlug
    };

    var IsUserEnrolled = {
        __proto__: null
    };

    var getPaymentInfo = {
        __proto__: null
    };

    var index$1 = {
        __proto__: null,
        getPaymentInfo: getPaymentInfo
    };

    var re = {
      url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
      cf: /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
    };
    yup__namespace.string().matches(re.url);
    yup__namespace.string().uppercase().matches(re.cf);
    var emailSchema = yup__namespace.string().email();

    var UserExistsSchema = yup__namespace.object({
      email: emailSchema.required()
    });

    var index = {
        __proto__: null,
        IsUserEnrolled: IsUserEnrolled,
        pay: index$1,
        UserExistsSchema: UserExistsSchema
    };

    exports.e = index;
    exports.f = index$5;
    exports.gql = index$2;
    exports.h = index$3;
    exports.t = index$4;

}));
//# sourceMappingURL=index.umd.js.map
