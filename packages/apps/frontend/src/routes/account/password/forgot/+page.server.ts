import type { Actions } from './$types';
import { routes as r } from 'join-shared';
import { error, redirect } from '@sveltejs/kit';
import paths from '$lib/constants/paths';

//

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		const res = await r.Account.Password.Forgot.send({ email }, fetch);

		if (!res.ok || res.error) {
			// throw error(res.status, res.error?.error.message);
			return error(400, { message: res.error?.error.message || 'SERVER_ERROR' });
		}
		//
		else if (res.data) {
			throw redirect(307, paths.password.forgot.confirm);
		}
	}
};
