import type { PageServerLoad, Actions } from './$types';
import { routes as r } from 'join-shared';
import { error, redirect } from '@sveltejs/kit';
import paths from '$lib/constants/paths';
import { setJWTCookie } from '$lib/utils/cookies';
import { restructure } from '$lib/utils/formData';

//

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(307, '/');
	return {};
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const body = restructure(data) as r.Account.Register.Req;
		const res = await r.Account.Register.send(body, fetch);

		if (!res.ok || res.error) {
			return error(400, { message: res.error?.error.message || 'SERVER_ERROR' });
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
