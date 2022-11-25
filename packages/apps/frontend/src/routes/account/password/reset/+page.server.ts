import type { Actions } from './$types';
import { routes as r } from 'join-shared';
import { invalid, redirect } from '@sveltejs/kit';
import { setJWTCookie } from '$lib/utils/setJwtCookie';

//

export const actions: Actions = {
	default: async ({ request, url, cookies }) => {
		const data = await request.formData();

		const password = data.get('password') as string;
		const passwordConfirmation = data.get('passwordConfirmation') as string;
		const code = url.searchParams.get('code');

		if (!password || !passwordConfirmation || !code) {
			return invalid(400, { error: 'Invalid data' });
		}

		const body: r.Account.Password.Reset.Req = {
			password,
			passwordConfirmation,
			code
		};

		const res = await r.Account.Password.Reset.send(body, fetch);

		if (!res.ok || res.error) {
			// throw error(res.status, res.error?.error.message);
			return invalid(400, { error: res.error?.error.message });
		}
		//
		else if (res.data) {
			setJWTCookie(cookies, res.data.jwt);
			throw redirect(307, '/');
		}
	}
};
