import * as yup from "yup";
import { Schemas } from "../../validation";
import { UsersPermissionsMe } from "../../types";
import { Request } from "../../request";
import { send as s } from "../../join-request";

//

export const path = "/auth/local";

export const method = Request.HTTPMethod.POST;

export type Req = {
    identifier: string;
    password: string;
};

export const values: Req = {
    identifier: "",
    password: "",
};

export const schema = yup
    .object({
        identifier: Schemas.email.required(),
        password: yup.string().required(),
    })
    .required();

export type Res = {
    user: UsersPermissionsMe;
    jwt: string;
};

export async function send(data: Req, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl });
}
