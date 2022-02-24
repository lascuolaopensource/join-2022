import * as yup from "yup";
import * as contacts from "./contacts";
import * as evaluation from "./evaluation";
import * as billing from "./billing";
import { thenReq } from "./utils";

/**
 * Enrollment form
 */

export const enSchema = yup.object({
    courseId: yup.number().required(),
    contacts: contacts.cSchema,
    evaluationNeeded: yup.boolean().required(),
    evaluation: evaluation.evSchema.when("evaluationNeeded", thenReq(true)),
    billingNeeded: yup.boolean().required(),
    billing: billing.bSchema.when("billingNeeded", thenReq(true)),
});

export interface enType {
    courseId: number;
    contacts: contacts.cType;
    evaluationNeeded: boolean;
    evaluation: evaluation.evType;
    billingNeeded: boolean;
    billing: billing.bType;
}
