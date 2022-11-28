import * as yup from "yup";
import { Contacts, Evaluation } from "../utils";
import { HTTPMethod, Shape } from "../../types";
import { send as s } from "../../join-request";

//

export const path = "/enroll";
export const method = HTTPMethod.POST;

export type Req = {
    courseId: string;
    contacts: Contacts.Type;
    evaluation: Evaluation.Type;
};

export const values: Req = {
    courseId: "",
    contacts: Contacts.values,
    evaluation: Evaluation.values,
};

export const schema = yup.object<Shape<Req>>({
    courseId: yup.string().required(),
    contacts: Contacts.schema.required(),
    evaluation: Evaluation.schema.required(),
});

export type Res = {
    paymentUID: string | null;
};

export function getSchemaCtx(
    userExists: boolean,
    letterNeeded: boolean,
    portfolioNeeded: boolean,
    cvNeeded: boolean
): ISchemaCtx {
    return {
        ...Contacts.getSchemaCtx(userExists),
        ...Evaluation.getSchemaCtx(letterNeeded, portfolioNeeded, cvNeeded),
    };
}

export interface ISchemaCtx
    extends Contacts.ISchemaCtx,
        Evaluation.ISchemaCtx {}

export async function send(data: Req, token = null, fetchImpl = fetch) {
    return s<Res>({ path, method, data, fetchImpl, auth: token });
}
