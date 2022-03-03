import { req } from '$lib/requestUtils';
import * as yup from 'yup';
import type { f } from 'shared';

//

export function createUserExistsTest(param: f.userExists.ueParam) {
	return async (value: any, testContext: yup.TestContext) => {
		try {
			// Creating body for post request
			const body = {};
			body[param] = value;

			// Sending post request
			const res = await req.userExists(body as f.userExists.ueType);

			return !res.exists;
		} catch (err) {
			// Questo è un fix non definitivo
			// Serve per segnalare un errore avvenuto durante il fetch al backend
			testContext.createError({ message: 'serverError' });
		}
	};
}

//

export const passwordValidator = yup.string().required().min(8).max(52);

export const urlValidator = yup
	.string()
	.matches(
		/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
		'Please enter valid url'
	);
