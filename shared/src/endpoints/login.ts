import * as yup from "yup";
import { emailSchema } from "../validators";
import { LoginResponse } from "../types";

/**
 * Login
 */

export const LoginValues = {
	identifier: "",
	password: "",
};

export const LoginSchema = yup.object({
	identifier: emailSchema.required(),
	password: yup.string().required(),
});

export type LoginReq = typeof LoginValues;

export type LoginRes = LoginResponse;
