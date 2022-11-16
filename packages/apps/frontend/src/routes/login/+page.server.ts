import type { PageServerLoad, Actions } from './$types';
import type { AppLocals } from '$lib/types';

import { invalid, redirect } from '@sveltejs/kit';

import { routes as r } from 'join-shared';

//

export const load: PageServerLoad = ({ locals }) => {
	if ((locals as AppLocals).user) throw redirect(307, '/');
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');

		if (!(Boolean(email) && Boolean(password))) {
			throw new Error(); // TODO
		}

		const body: r.Account.Login.Req = {
			identifier: email as string,
			password: password as string
		};

		try {
			const res = await r.Account.Login.send(body, fetch);

			const value = Buffer.from(JSON.stringify(res.jwt), 'base64');
			cookies.set('jwt', value.toString(), { path: '/' });

			throw redirect(307, '/');
		} catch (error) {
			return invalid(401, {});
		}
	}
};
