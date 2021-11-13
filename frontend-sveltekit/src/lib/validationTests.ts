import { post } from '$lib/helpers/requestUtils';
import * as yup from 'yup';
import { variables } from './variables';

export function createExistsTest(param: string, invert: boolean = false) {
	return async (value, testContext) => {
		// Creating body for post request
		const body = {};
		body[param] = value;

		// Sending post request
		const res: { exists: boolean } = await post(
			fetch,
			variables.backendUrl + `/exists`,
			body
		);

		return invert ? !res.exists : res.exists;
	};
}

export const passwordValidator = yup.string().required().min(8).max(52);
