import * as yup from "yup";
import { HTTPMethod, UsersPermissionsMe } from "../../../types";
import { send as s } from "../../../join-request";

//

export const path = "/auth/reset-password";
export const method = HTTPMethod.POST;

export type Req = {
    password: string;
    passwordConfirmation: string;
    code: string;
};

export const values: Req = {
    password: "string",
    passwordConfirmation: "string",
    code: "string",
};

export const schema = yup
    .object({
        password: yup.string().required(),
        passwordConfirmation: yup.string().required(),
        code: yup.string().required(),
    })
    .required();

export interface Res {
    user: UsersPermissionsMe;
    jwt: string;
}

export async function send(data: Req, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl });
}
