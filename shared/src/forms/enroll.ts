import * as yup from "yup";
import * as contacts from "./contacts";
import * as evaluation from "./evaluation";

/**
 * Enrollment form
 */

export const enValues = {
    courseId: "",
    contacts: contacts.cValues,
    evaluation: evaluation.evValues,
};

export const enSchema = yup.object({
    courseId: yup.string().required(),
    contacts: contacts.cSchema,
    evaluation: evaluation.evSchema,
});

export interface enRequest {
    courseId: string;
    contacts: contacts.cType;
    evaluation: evaluation.evType;
}

export interface enResponse {
    paymentId: string | null;
}
