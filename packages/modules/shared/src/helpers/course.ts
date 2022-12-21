import { Course, ComponentTimeMeetings, CleanComp as CC } from "../types";
import { Evaluation } from "../routes";

//

export function getEvaluationSchemaCtx(c: Course): Evaluation.ISchemaCtx {
    return {
        cvNeeded: c.cvNeeded,
        letterNeeded: c.motivationalLetterNeeded,
        portfolioNeeded: c.portfolioNeeded,
    };
}

export function isPaymentNeeded(c: Course): boolean {
    return c.price > 0;
}

export function hasDeadlinePassed(c: Course): boolean {
    return Date.now() > Date.parse(c.enrollmentDeadline);
}

export function getFirstMeeting(
    c: Course
): CC<ComponentTimeMeetings> | undefined {
    return c.meetings[0];
}

export function getStart(c: Course): Date {
    return new Date(getFirstMeeting(c)?.start);
}
