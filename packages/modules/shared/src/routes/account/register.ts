import * as yup from "yup";
import { Schemas } from "../../validation";
import { HTTPMethod, UsersPermissionsLoginPayload } from "../../types";
import { send as s } from "../../join-request";

//

export const path = "account/register";
export const method = HTTPMethod.POST;

export type Req = {
    name: string;
    surname: string;
    email: string;
    password: string;
};

export const values: Req = {
    name: "",
    surname: "",
    email: "",
    password: "",
};

export const schema = yup
    .object({
        name: yup.string().required(),
        surname: yup.string().required(),
        email: Schemas.email.required(),
        password: yup.string().required(),
    })
    .required();

export interface Res extends UsersPermissionsLoginPayload {}

export async function send(data: Req, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl });
}
