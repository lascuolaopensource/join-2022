import { ComponentBillingOwner, CleanComp, Shape } from "$types";
import { Schemas } from "$validation";
import * as yup from "yup";

//

export namespace Owner {
	export interface Type extends CleanComp<ComponentBillingOwner> {}

	export const values: Type = {
		fiscalCode: "",
	};

	export const schema = yup.object<Shape<Type>>({
		fiscalCode: Schemas.cf.required(),
	});
}
