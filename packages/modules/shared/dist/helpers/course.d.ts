import { Course } from "../types";
import { Evaluation } from "../routes";
export declare function getEvaluationSchemaCtx(c: Course): Evaluation.ISchemaCtx;
export declare function isPaymentNeeded(c: Course): boolean;
export declare function hasDeadlinePassed(c: Course): boolean;
