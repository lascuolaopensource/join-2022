import * as yup from "yup";
import { Schemas } from "../../../validation";
import { HTTPMethod } from "../../../types";

export namespace Forgot {
	export const path = "/auth/forgot-password";
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
		ok: boolean;
		// Also, there's a redirection
		// The url has a code needed for the reset
	}
}
