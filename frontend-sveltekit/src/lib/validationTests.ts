import post from '$lib/requestUtils/post';
import { endpoints } from './requestUtils/endpoints';
import * as yup from 'yup';

//

export function createUserExistsTest(param: 'email' | 'username') {
	return async (value, testContext) => {
		try {
			// Creating body for post request
			const body = {};
			body[param] = value;

			// Sending post request
			const res: { exists: boolean } = await post(
				fetch,
				endpoints.checkUserExists,
				body
			);

			return !res.exists;
		} catch (err) {
			// Questo è un fix non definitivo
			// Serve per segnalare un errore avvenuto durante il fetch al backend
			testContext.createError({ message: err.message });
		}
	};
}

//

export const passwordValidator = yup.string().required().min(8).max(52);
