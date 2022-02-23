import * as yup from "yup";
import { re, thenReq, thenNull } from "./utils";

/**
 * Util
 */

export const urlVal = yup.string().matches(re.url);
export const cfVal = yup.string().matches(re.cf);

/**
 * User
 */

export const userVal = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  surname: yup.string().required(),
});

export interface FUser {
  email: string;
  name: string;
  surname: string;
}

/**
 * Contacts
 */

export const contactsVal = yup.object({
  userExists: yup.boolean().required(),
  user: userVal.when("userExists", thenReq(false)),
  phone: yup.string().required(),
});

export interface FContacts {
  userExists: boolean;
  user: FUser;
  phone: string;
}

/**
 * Evaluation
 */

export const evaluationVal = yup.object({
  letterNeeded: yup.boolean().required(),
  letter: yup.string().when("letterNeeded", thenReq(true)),
  portfolioNeeded: yup.boolean().required(),
  portfolio: urlVal.when("portfolioNeeded", thenReq(true)),
  cvNeeded: yup.boolean().required(),
  cv: urlVal.when("cvNeeded", thenReq(true)),
});

export interface FEvaluation {
  letterNeeded: boolean;
  letter: string;
  portfolioNeeded: boolean;
  portfolio: string;
  cvNeeded: boolean;
  cv: string;
}
/**
 * Address
 */

export const addressVal = yup.object({
  cap: yup.string().required(),
  town: yup.string().required(),
  province: yup.string().required(),
  street: yup.string().required(),
});

export interface FAddress {
  cap: string;
  town: string;
  province: string;
  street: string;
}

/**
 * Billing
 */

export const billingOptions = ["me", "person", "company"] as const;
type BillingOptions = typeof billingOptions[number];

export const billingVal = yup.object({
  billingOption: yup
    .string()
    .oneOf(billingOptions as any)
    .required(),
  // Me
  me: yup
    .object({
      cf: cfVal,
    })
    .when("billingOption", thenReq(billingOptions[0])),
  // Persona fisica
  person: yup
    .object({
      name: yup.string().required(),
      surname: yup.string().required(),
      cf: cfVal,
    })
    .when("billingOption", thenReq(billingOptions[1])),
  // Azienda
  company: yup
    .object({
      name: yup.string().required(),
      vat: yup.string().required(),
      sdi: yup.string().required(),
    })
    .when("billingOption", thenReq(billingOptions[2])),
  // Generici
  email: yup
    .string()
    .email()
    .when("billingOption", thenNull(billingOptions[0])),
  address: addressVal.required(),
});

export interface FBilling {
  billingOption: BillingOptions;
  me: {
    cf: string;
  };
  person: {
    name: string;
    surname: string;
    cf: string;
  };
  company: {
    name: string;
    vat: string;
    sdi: string;
  };
  email: string;
  address: FAddress;
}

/**
 * Enrollment
 */

export const enrollVal = yup
  .object({
    courseId: yup.number().required(),
    contacts: contactsVal.required(),
    evaluationNeeded: yup.boolean().required(),
    evaluation: evaluationVal.when("evaluationNeeded", thenReq(true)),
    billingNeeded: yup.boolean().required(),
    billing: billingVal.when("billingNeeded", thenReq(true)),
  })
  .required();

export interface FEnroll {
  courseId: number;
  contacts: FContacts;
  evaluationNeeded: boolean;
  evaluation: FEvaluation;
  billingNeeded: boolean;
  billing: FBilling;
}
