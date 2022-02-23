import * as yup from "yup";
import { thenReq, thenNull, urlSchema, cfSchema } from "./utils";

/**
 * Util
 */

/**
 * User
 */

export const userVal = yup.object({
    exists: yup.boolean().required(),
    data: yup
        .object({
            email: yup.string().email().required(),
            name: yup.string().required(),
            surname: yup.string().required(),
        })
        .when("exists", thenReq(false)),
});

export interface FUser {
    exists: boolean;
    data: {
        email: string;
        name: string;
        surname: string;
    };
}

/**
 * Phone
 */

export const phoneVal = yup.string().required();

/**
 * Evaluation
 */

export const evaluationVal = yup.object({
    letterNeeded: yup.boolean().required(),
    letter: yup.string().when("letterNeeded", thenReq(true)),
    portfolioNeeded: yup.boolean().required(),
    portfolio: urlSchema.when("portfolioNeeded", thenReq(true)),
    cvNeeded: yup.boolean().required(),
    cv: urlSchema.when("cvNeeded", thenReq(true)),
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
            cf: cfSchema,
        })
        .when("billingOption", thenReq(billingOptions[0])),
    // Persona fisica
    person: yup
        .object({
            name: yup.string().required(),
            surname: yup.string().required(),
            cf: cfSchema,
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
        user: userVal.required(),
        phone: phoneVal.required(),
        evaluationNeeded: yup.boolean().required(),
        evaluation: evaluationVal.when("evaluationNeeded", thenReq(true)),
        billingNeeded: yup.boolean().required(),
        billing: billingVal.when("billingNeeded", thenReq(true)),
    })
    .required();

export interface FEnroll {
    courseId: number;
    user: FUser;
    phone: string;
    evaluationNeeded: boolean;
    evaluation: FEvaluation;
    billingNeeded: boolean;
    billing: FBilling;
}

//

export * as loginEmail from "./loginEmail";
