import { Course as ICourse } from "$types";
import { Evaluation } from "$routes";
export declare namespace Course {
    function getEvaluationSchemaCtx(c: ICourse): Evaluation.ISchemaCtx;
    function isPaymentNeeded(c: ICourse): boolean;
}
