import * as yup from "yup";
import { Billing, Address } from "../components";
import { HTTPMethod, Shape } from "../../types";
import { Schemas } from "../../validation";

//

export type Params = { id: string };
export const path = (params: Params = { id: ":id" }) =>
    `/pay/execute/${params.id}`;
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
