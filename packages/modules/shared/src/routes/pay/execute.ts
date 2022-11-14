import * as yup from "yup";
import { Billing, Address } from "../utils";
import { HTTPMethod, Shape } from "$types";
import { Schemas } from "$validation";

export namespace Execute {
	export const path = "/pay/execute";
	export const method = HTTPMethod.POST;

	export interface Req {
		paymentId: string;
		billingOption: Billing.Option;
		owner: Billing.Owner.Type;
		person: Billing.Person.Type;
		company: Billing.Company.Type;
		address: Address.Type;
	}

	export const values: Req = {
		paymentId: "",
		billingOption: Billing.Options[0],
		owner: Billing.Owner.values,
		person: Billing.Person.values,
		company: Billing.Company.values,
		address: Address.values,
	};

	export const schema = yup.object<Shape<Req>>({
		paymentId: yup.string().required(),
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
}
