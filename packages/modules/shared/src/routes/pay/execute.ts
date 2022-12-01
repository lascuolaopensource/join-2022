import * as yup from "yup";
import { Billing, Address } from "../components";
import { HTTPMethod, Shape } from "../../types";
import { Schemas } from "../../validation";
import { flattenObject } from "flatten-anything";
import { nestifyObject } from "nestify-anything";

//

export const path = (id = ":id") => `/pay/execute/${id}`;
export const method = HTTPMethod.POST;

export type Req = {
    billingOption: Billing.Option;
    owner: Billing.Owner.Type;
    person: Billing.Person.Type;
    company: Billing.Company.Type;
    address: Address.Type;
};

export const values: Req = {
    billingOption: Billing.Options[0],
    owner: Billing.Owner.values,
    person: Billing.Person.values,
    company: Billing.Company.values,
    address: Address.values,
};

function listKeys(record: Record<string, unknown>) {
    const list: Record<string, string> = {};
    for (const key of Object.keys(record)) {
        list[key] = key;
    }
    return list;
}

console.log(nestifyObject(listKeys(flattenObject(values))));

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
