import { ComponentBillingPerson, CleanComp, Shape } from "$types";
import { Schemas } from "$validation";
import * as yup from "yup";

//

export namespace Person {
	export interface Type extends CleanComp<ComponentBillingPerson> {}

	export const values: Type = {
		name: "",
		surname: "",
		fiscalCode: "",
		email: "",
	};

	export const schema = yup.object<Shape<Type>>({
		name: yup.string().required(),
		surname: yup.string().required(),
		fiscalCode: Schemas.cf.required(),
		email: Schemas.email.required(),
	});
}
