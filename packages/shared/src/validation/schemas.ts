import * as yup from "yup";
import { Regex as re } from "./regex";

export namespace Schemas {
	/**
	 * Basic schemas
	 */

	export const url = yup.string().lowercase().matches(re.url);

	export const cf = yup.string().uppercase().matches(re.cf);
	export const vat = yup.string().matches(re.vat);
	export const sdi = yup.string().uppercase().matches(re.sdi);

	export const phone = yup.string().matches(re.phone);
	export const email = yup.string().email();
	export const pec = email.matches(re.pec);

	export const provincia = yup.string().uppercase().matches(re.provincia);
	export const cap = yup.string().matches(re.cap);

	/**
	 * Yup dynamic checks
	 */

	export function thenReq(value: boolean | string) {
		return {
			is: value,
			then: (schema: yup.AnySchema) => schema.required(),
			otherwise: (schema: yup.AnySchema) => schema.nullable().optional(),
		};
	}

	export function thenUrlReq(value: boolean | string) {
		return {
			is: value,
			then: (schema: yup.AnySchema) => url.required(),
			otherwise: (schema: yup.AnySchema) => schema.nullable().optional(),
		};
	}

	export function thenNull(value: boolean | string) {
		return {
			is: value,
			then: (schema: yup.AnySchema) => schema.nullable().optional(),
			otherwise: (schema: yup.AnySchema) => schema.required(),
		};
	}

	export const nullOrReq = {
		is: (v: string | boolean | number) => v == true,
		then: (s: yup.AnySchema) => s.nullable(),
		otherwise: (s: yup.AnySchema) => s.required(),
	};
}
