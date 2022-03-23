import * as yup from "yup";
import { emailSchema } from "./__utils";

//

export type UserExistsReq = {
	email: string;
};

export type UserExistsRes = {
	exists: boolean;
};

export const UserExistsSchema = yup.object({
	email: emailSchema.required(),
});
