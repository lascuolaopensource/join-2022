import * as yup from "yup";
import { Schemas } from "../../../validation";
import { HTTPMethod } from "../../../types";
import { send as s } from "../../../join-request";

//

export const path = "/auth/forgot-password";
export const method = HTTPMethod.POST;

export type Req = {
    email: string;
};

export const values: Req = {
    email: "",
};

export const schema = yup
    .object({
        email: Schemas.email.required(),
    })
    .required();

export interface Res {
    ok: boolean;
}

export async function send(data: Req, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl });
}
