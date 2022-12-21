import * as yup from "yup";
import { ComponentSpaceAddress, Shape, CleanComp } from "$types";
import { Schemas } from "$validation";

export namespace Address {
	export interface Type extends CleanComp<ComponentSpaceAddress> {}

	export const values: Type = {
		country: "",
		administrativeArea: "",
		city: "",
		postCode: "",
		street: "",
		number: "",
	};

	export const schema = yup.object<Shape<Type>>({
		country: yup.string().required(),
		administrativeArea: Schemas.provincia.required(),
		city: yup.string().required(),
		postCode: Schemas.cap.required(),
		street: yup.string().required(),
		number: yup.string().required(),
	});
}
