import type { Actions } from './$types';
import { routes as r } from 'join-shared';
import { error, redirect } from '@sveltejs/kit';
import { setJWTCookie } from '$lib/utils/cookies';
import { restructure } from '$lib/utils/formData';

//

export const actions: Actions = {
	default: async ({ request, url, cookies }) => {
		const code = url.searchParams.get('code');

		if (!code) {
			return error(400, { message: 'Invalid data' });
		}

		const data = await request.formData();
		const body = restructure(data) as r.Account.Password.Reset.Req;
		body.code = code; // Adding code to body

		const res = await r.Account.Password.Reset.send(body, fetch);

		if (!res.ok || res.error) {
			// throw error(res.status, res.error?.error.message);
			return error(400, { message: res.error?.error.message || 'SERVER_ERROR' });
		}
		//
		else if (res.data) {
			setJWTCookie(cookies, res.data.jwt);
			throw redirect(307, '/');
		}
	}
};
