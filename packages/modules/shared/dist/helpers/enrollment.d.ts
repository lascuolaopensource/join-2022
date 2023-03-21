import { EnrollmentEntity } from "../types";
import { Update } from "../routes/admin/enrollments";
export declare function getItem(e: EnrollmentEntity): Update.Item;
export declare function getItems(es: EnrollmentEntity[]): Update.Item[];
