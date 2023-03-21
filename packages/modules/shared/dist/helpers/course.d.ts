import { Course, ComponentTimeMeetings, CleanComp as CC } from "../types";
import { Evaluation } from "../routes";
export declare function getEvaluationSchemaCtx(c: Course): Evaluation.ISchemaCtx;
export declare function isPaymentNeeded(c: Course): boolean;
export declare function hasDeadlinePassed(c: Course): boolean;
export declare function getFirstMeeting(c: Course): CC<ComponentTimeMeetings> | undefined;
export declare function getStart(c: Course): Date;
export declare function isEvaluationTime(c: Course): boolean;
export declare function canEditEnrollments(c: Course): boolean;
