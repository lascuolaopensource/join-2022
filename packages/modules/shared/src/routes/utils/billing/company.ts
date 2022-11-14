import { ComponentBillingCompany, CleanComp, Shape } from "$types";
import { Schemas } from "$validation";
import * as yup from "yup";

//

export namespace Company {
	export interface Type extends CleanComp<ComponentBillingCompany> {}

	export const values: Type = {
		name: "",
		vatNumber: "",
		sdiCode: "",
		certifiedEmail: "",
	};

	export const schema = yup.object<Shape<Type>>({
		name: yup.string().required(),
		vatNumber: Schemas.vat.required(),
		sdiCode: Schemas.sdi,
		certifiedEmail: Schemas.pec.required(),
	});
}
