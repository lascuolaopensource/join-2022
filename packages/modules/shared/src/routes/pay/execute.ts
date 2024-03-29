import * as yup from "yup";
import { Billing, Address } from "../components";
import { HTTPMethod, Shape } from "../../types";
import { Schemas } from "../../validation";
import { send as s } from "../../join-request";

//

export const method = HTTPMethod.POST;

export type Params = { id: string };
export const defaultParams: Params = { id: ":id" };

export function path(params = defaultParams) {
    return `/pay/execute/${params.id}`;
}

//

export type Req = {
    billingOption: Billing.Option;
    owner: Billing.Owner.Type | null;
    person: Billing.Person.Type | null;
    company: Billing.Company.Type | null;
    address: Address.Type;
};

export const values: Req = {
    billingOption: Billing.Options[0],
    owner: Billing.Owner.values,
    person: Billing.Person.values,
    company: Billing.Company.values,
    address: Address.values,
};

export const schema = yup.object<Shape<Req>>({
    billingOption: yup
        .string()
        .oneOf([...Billing.Options])
        .required(),
    owner: Billing.Owner.schema.when(
        "billingOption",
        Schemas.thenReq(Billing.Options[0])
    ),
    person: Billing.Person.schema.when(
        "billingOption",
        Schemas.thenReq(Billing.Options[1])
    ),
    company: Billing.Company.schema.when(
        "billingOption",
        Schemas.thenReq(Billing.Options[2])
    ),
    address: Address.schema.required(),
});

export interface Res {
    sessionUrl: string | null;
}

export async function send(paymentID: string, data: Req, fetchImpl = fetch) {
    return s<Res>({
        path: path({ id: paymentID }),
        method,
        data,
        fetchImpl,
    });
}
