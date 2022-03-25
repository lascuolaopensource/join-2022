import * as yup from "yup";
import { emailSchema, setYupDefaultMessages } from "../validators";

setYupDefaultMessages();

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
