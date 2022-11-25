import type { PageServerLoad, Actions } from './$types';
import { routes as r } from 'join-shared';
import { invalid, redirect } from '@sveltejs/kit';
import paths from '$lib/constants/paths';
import { setJWTCookie } from '$lib/utils/setJwtCookie';

//

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(307, '/');
	return {};
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		const name = data.get('name');
		const surname = data.get('surname');

		const body: r.Account.Register.Req = {
			name: name as string,
			surname: surname as string,
			email: email as string,
			password: password as string
		};

		const res = await r.Account.Register.send(body, fetch);

		if (!res.ok || res.error) {
			// throw error(res.status, res.error?.error.message);
			return invalid(400, { name, surname, email, error: res.error?.error.message });
		}
		//
		else if (res.data) {
			// If there's no jwt, redirect to thank you page
			if (!res.data.jwt) throw redirect(307, paths.register.thanks);

			// If there's jwt in the response
			// it means that account confirmation is disabled in the backend
			setJWTCookie(cookies, res.data.jwt);

			throw redirect(307, paths.login);
		}
	}
};
