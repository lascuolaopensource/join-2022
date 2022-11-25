import type { PageServerLoad, Actions } from './$types';
import { invalid, redirect } from '@sveltejs/kit';
import { routes as r } from 'join-shared';
import { setJWTCookie } from '$lib/utils/setJwtCookie';

//

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) throw redirect(307, '/');
	return {};
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		const body: r.Account.Login.Req = {
			identifier: email as string,
			password: password as string
		};

		const res = await r.Account.Login.send(body, fetch);

		if (!res.ok || Boolean(res.error)) {
			return invalid(400, { error: res.error?.error.message });
		}
		//
		else if (res.data) {
			setJWTCookie(cookies, res.data.jwt);
			throw redirect(307, '/');
		}
	}
};
