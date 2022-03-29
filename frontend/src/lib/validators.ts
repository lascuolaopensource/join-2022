import { req } from '$lib/requestUtils';
import { validators } from 'shared';
import * as yup from 'yup';

validators.setYupDefaultMessages();

//

export function addEmailExistsTest(
	s: yup.StringSchema,
	message = 'emailExists'
): yup.StringSchema {
	return s.email().test({
		name: 'emailExists',
		message,
		test: async (value, testContext) => {
			const res = await req.userExists({ email: value });
			return !res.exists;
		}
	});
}

export const emailExistsSchema = addEmailExistsTest(yup.string());

export const passwordSchema = yup.string().required().min(8).max(52);
