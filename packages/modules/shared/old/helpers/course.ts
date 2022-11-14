import { Course, Enrollment, Enum_Enrollment_State } from "../types";

// Date getters

export function getStartDate(c: Course): string {
	return c.meetings[0].date;
}

export function getEndDate(c: Course): string {
	return c.meetings[c.meetings.length - 1].date;
}

// Evaluation flags

export function isPaymentNeeded(c: Course): boolean {
	return c.price > 0;
}

export function isEvaluationNeeded(c: Course): boolean {
	return c.cvNeeded || c.motivationalLetterNeeded || c.portfolioNeeded;
}

// Course times

export function isErollmentTime(c: Course): boolean {
	return Date.now() < Date.parse(c.enrollmentDeadline);
}

export function isCourseTime(c: Course): boolean {
	return Date.now() >= Date.parse(getStartDate(c));
}

export function isEvaluationTime(c: Course): boolean {
	return !isErollmentTime(c) && !isCourseTime(c);
}

// Enrollments flags

export function areMinEnrollsReached(c: Course, e: Array<Enrollment>): boolean {
	return e.length >= c.enrollmentMin;
}

export function areMaxEnrollsExceeded(
	c: Course,
	e: Array<Enrollment>
): boolean {
	return e.length > c.enrollmentMax;
}

export function countEnrollsApproved(a: Array<Enrollment>): number {
	return a.filter((e) => e.state == Enum_Enrollment_State.Approved).length;
}

export function areMinEnrollsApproved(
	c: Course,
	e: Array<Enrollment>
): boolean {
	return countEnrollsApproved(e) >= c.enrollmentMin;
}

//

export function canStart(c: Course, e: Array<Enrollment>): boolean {
	return areMinEnrollsReached(c, e) && isEvaluationTime(c);
}

export function cannotStart(c: Course, e: Array<Enrollment>): boolean {
	return !areMinEnrollsReached(c, e) && isEvaluationTime(c);
}

//

export function isActive(c: Course, e: Array<Enrollment>): boolean {
	return areMinEnrollsApproved(c, e) && isCourseTime(c);
}

export function isNotActivated(c: Course, e: Array<Enrollment>): boolean {
	return !areMinEnrollsApproved(c, e) && isCourseTime(c);
}
