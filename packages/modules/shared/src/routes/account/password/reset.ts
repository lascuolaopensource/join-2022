import * as yup from "yup";
import { HTTPMethod, UsersPermissionsMe } from "../../../types";

export namespace Reset {
	export const path = "/auth/reset-password";
	export const method = HTTPMethod.POST;

	export interface Req {
		password: string;
		passwordConfirmation: string;
		code: string;
	}

	export const values: Req = {
		password: "string",
		passwordConfirmation: "string",
		code: "string",
	};

	export const schema = yup
		.object({
			password: yup.string().required(),
			passwordConfirmation: yup.string().required(),
			code: yup.string().required(),
		})
		.required();

	export interface Res {
		user: UsersPermissionsMe;
		jwt: string;
	}
}
