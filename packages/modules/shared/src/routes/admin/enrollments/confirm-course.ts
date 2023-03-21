import { HTTPMethod } from "../../../types";
import { send as s } from "../../../join-request";

//

export const method = HTTPMethod.GET;

export type Params = { id: string };
export const defaultParams: Params = { id: ":id" };

export function path(params = defaultParams) {
    return `/admin-enrollments/confirm-course/${params.id}`;
}

//

export interface Res {}

export async function send(courseID: string, auth: string, fetchImpl = fetch) {
    return s<Res>({ path: path({ id: courseID }), method, fetchImpl, auth });
}
