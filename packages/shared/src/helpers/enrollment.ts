import { EnrollmentEntity } from "../types";
import { Update } from "../routes/admin/enrollments";

export function getItem(e: EnrollmentEntity): Update.Item {
    return {
        id: e.id,
        state: e.attributes.state,
    };
}

export function getItems(es: EnrollmentEntity[]): Update.Item[] {
    return es.map(getItem);
}
