import * as yup from "yup";
import { Schemas } from "../../validation";
import { Shape } from "../../types";

export namespace Contacts {
	export interface Type {
		email: string;
		name: string;
		surname: string;
		phone: string;
	}

	export const values: Type = {
		email: "",
		name: "",
		surname: "",
		phone: "",
	};

	const USER_EXISTS = "$userExists";
	export const schema = yup.object<Shape<Type>>({
		email: yup.string().email().when(USER_EXISTS, Schemas.thenReq(false)),
		name: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
		surname: yup.string().when(USER_EXISTS, Schemas.thenReq(false)),
		phone: Schemas.phone.required(),
	});

	export interface ISchemaCtx {
		userExists: boolean;
	}

	export function getSchemaCtx(userExists: boolean): ISchemaCtx {
		return { userExists };
	}
}
