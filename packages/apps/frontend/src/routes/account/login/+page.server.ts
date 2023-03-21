import type { PageServerLoad, Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { routes as r } from 'join-shared';
import { setJWTCookie } from '$lib/utils/cookies';
import { restructure } from '$lib/utils/formData';

//

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) throw redirect(307, '/');
	return {};
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const body = restructure(data) as r.Account.Login.Req;
		const res = await r.Account.Login.send(body, fetch);

		if (!res.ok || Boolean(res.error)) {
			return error(400, { message: res.error?.error.message || '' });
		}
		//
		else if (res.data) {
			setJWTCookie(cookies, res.data.jwt);
			throw redirect(307, '/');
		}
	}
};
