import * as yup from "yup";
import { Schemas } from "../../validation";
import { HTTPMethod, UsersPermissionsMe } from "../../types";

//

export const path = "/auth/local";
export const method = HTTPMethod.POST;

//

export interface Req {
    identifier: string;
    password: string;
}

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

export interface Res {
    user: UsersPermissionsMe;
    jwt: string;
}
