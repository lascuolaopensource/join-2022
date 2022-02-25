(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('yup')) :
    typeof define === 'function' && define.amd ? define(['exports', 'yup'], factory) :
    (global = global || self, factory(global.shared = {}, global.yup));
})(this, (function (exports, yup) {
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
    var urlSchema = yup__namespace.string().matches(re.url);
    var cfSchema = yup__namespace.string().matches(re.cf);
    var emailSchema = yup__namespace.string().email();
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
    var lpSchema = yup__namespace.object({
      password: yup__namespace.string().required()
    });

    var loginPassword = {
        __proto__: null,
        lpValues: lpValues,
        lpSchema: lpSchema
    };

    var ueSchema = yup__namespace.object({
      email: emailSchema.optional(),
      username: yup__namespace.string().optional()
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

    var enSchema = yup__namespace.object({
      courseId: yup__namespace.number().required(),
      contacts: cSchema,
      evaluationNeeded: yup__namespace["boolean"]().required(),
      evaluation: evSchema.when("evaluationNeeded", thenReq(true))
    });

    var enroll = {
        __proto__: null,
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
      sdi: yup__namespace.string().required()
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

    var payment = {
        __proto__: null,
        pSchema: pSchema
    };

    var index$2 = {
        __proto__: null,
        loginEmail: loginEmail,
        loginPassword: loginPassword,
        userExists: userExists,
        enroll: enroll,
        billing: billing,
        contacts: contacts,
        evaluation: evaluation,
        payment: payment
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

    var index$1 = {
        __proto__: null,
        get PublicationState () { return PublicationState; },
        get Enum_Enrollment_State () { return Enum_Enrollment_State; }
    };

    function isBillingNeeded(c) {
      return c.price > 0;
    }
    function isEvaluationNeeded(c) {
      return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
    }

    var index = {
        __proto__: null,
        isBillingNeeded: isBillingNeeded,
        isEvaluationNeeded: isEvaluationNeeded
    };

    exports.f = index$2;
    exports.h = index;
    exports.t = index$1;

}));
//# sourceMappingURL=index.umd.js.map
