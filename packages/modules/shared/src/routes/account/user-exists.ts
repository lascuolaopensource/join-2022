import * as yup from "yup";
import { Schemas } from "../../validation";
import { HTTPMethod } from "../../types";

export namespace UserExists {
	export const path = "/account/user-exists";
	export const method = HTTPMethod.POST;

	export interface Req {
		email: string;
	}

	export const values: Req = {
		email: "",
	};

	export const schema = yup
		.object({
			email: Schemas.email.required(),
		})
		.required();

	export interface Res {
		exists: boolean;
	}
}
