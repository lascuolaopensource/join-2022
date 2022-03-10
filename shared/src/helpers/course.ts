import * as t from "../types";

export function isPaymentNeeded(c: t.Course): boolean {
    return c.price > 0;
}

export function isEvaluationNeeded(c: t.Course): boolean {
    return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}

export function isEnrollable(c: t.Course): boolean {
    return Date.now() < Date.parse(c.enrollmentDeadline);
}
