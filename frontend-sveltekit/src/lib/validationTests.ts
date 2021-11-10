import { post } from '$lib/helpers/requestUtils';

export function createExistsTest(param: string, invert: boolean = false) {
	return async (value, testContext) => {
		// Creating body for post request
		const body = {};
		body[param] = value;

		// Sending post request
		const res: { exists: boolean } = await post(
			fetch,
			`http://localhost:1337/exists`,
			body
		);

		return invert ? !res.exists : res.exists;
	};
}
