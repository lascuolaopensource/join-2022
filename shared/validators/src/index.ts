import * as yup from "yup";
import { re, thenReq } from "./utils";

/**
 * Util
 */

export const urlVal = yup.string().matches(re.url);
export const cfVal = yup.string().matches(re.cf);

/**
 * Contacts
 */

export const userVal = yup
  .object({
    exists: yup.boolean().required(),
    data: yup
      .object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        surname: yup.string().required(),
      })
      .when("exists", thenReq(false)),
  })
  .required();

export const phoneVal = yup.string().required();

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

/**
 * Billing
 */

export const addressVal = yup
  .object({
    cap: yup.string().required(),
    town: yup.string().required(),
    province: yup.string().required(),
    street: yup.string().required(),
  })
  .required();

export const billingOptions = ["me", "person", "company"];

export const billingVal = yup.object({
  billingOption: yup.string().oneOf(billingOptions).required(),
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
  email: yup.string().email().required(),
  address: addressVal,
});

/**
 * Form validator
 */

export const enrollVal = yup.object({
  user: userVal,
  evaluationNeeded: yup.boolean().required(),
  evaluation: evaluationVal.when("evaluationNeeded", thenReq(true)),
  billingNeeded: yup.boolean().required(),
  billing: billingVal.when("billingNeeded", thenReq(true)),
});
