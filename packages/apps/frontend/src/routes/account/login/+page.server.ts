import type { PageServerLoad, Actions } from './$types';

import { invalid, redirect, error } from '@sveltejs/kit';

import { routes as r } from 'join-shared';

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

		if (!(Boolean(email) && Boolean(password))) {
			return invalid(401, {}); // TODO
		}

		const body: r.Account.Login.Req = {
			identifier: email as string,
			password: password as string
		};

		const res = await r.Account.Login.send(body, fetch);

		if (!res.ok || Boolean(res.error)) {
			throw error(res.status, res.error?.error.message);
		}
		//
		else if (res.data) {
			cookies.set('jwt', res.data.jwt, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});

			throw redirect(307, '/');
		}
	}
};
