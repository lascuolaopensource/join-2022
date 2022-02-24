import * as yup from "yup";
import * as contacts from "./contacts";
import * as evaluation from "./evaluation";
import { thenReq } from "./utils";

/**
 * Enrollment form
 */

export const enSchema = yup.object({
    courseId: yup.number().required(),
    contacts: contacts.cSchema,
    evaluationNeeded: yup.boolean().required(),
    evaluation: evaluation.evSchema.when("evaluationNeeded", thenReq(true)),
});

export type enFormBody = [contacts.cType, evaluation.evType?];

export interface enType {
    courseId: string;
    contacts: contacts.cType;
    evaluationNeeded: boolean;
    evaluation: evaluation.evType;
}

export interface enResponse {
    paymentId: string | null;
}
