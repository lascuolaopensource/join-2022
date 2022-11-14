import { Course as ICourse } from "$types";
import { Evaluation } from "$routes";

export namespace Course {
	export function getEvaluationSchemaCtx(c: ICourse): Evaluation.ISchemaCtx {
		return {
			cvNeeded: c.cvNeeded,
			letterNeeded: c.motivationalLetterNeeded,
			portfolioNeeded: c.portfolioNeeded,
		};
	}

	export function isPaymentNeeded(c: ICourse): boolean {
		return c.price > 0;
	}
}
