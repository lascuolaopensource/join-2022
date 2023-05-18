import * as yup from "yup";
import {
    HTTPMethod,
    Enum_Enrollment_State,
    Shape,
    EnrollmentStates,
} from "../../../types";
import { send as s } from "../../../join-request";

//

export const path = "/admin-enrollments/update";

export const method = HTTPMethod.POST;

export interface Item {
    id: string;
    state: Enum_Enrollment_State;
}

export const itemSchema = yup.object<Shape<Item>>({
    id: yup.string().required(),
    state: yup.string().oneOf(EnrollmentStates).required(),
});

export type Req = {
    items: Array<Item>;
};

export const schema = yup.object({
    items: yup.array(itemSchema).required(),
});

export interface Res {}

export async function send(data: Req, auth: string, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl, auth });
}
