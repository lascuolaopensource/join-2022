import type { PageServerLoad, Actions } from './$types';
import { routes as r } from 'join-shared';
import { invalid, error, redirect } from '@sveltejs/kit';
import paths from '$lib/constants/paths';

export const load: PageServerLoad = async () => {
	return {};
};

//

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');

		if (!email || !password || !firstName || !lastName) {
			return invalid(401, {}); // TODO
		}

		const body: r.Account.Register.Req = {
			name: firstName as string,
			surname: lastName as string,
			email: email as string,
			password: password as string
		};

		let res: r.Account.Register.Res | null = null;
		try {
			res = await r.Account.Register.send(body, fetch);
		} catch (e) {
			throw error(500, e as Error);
		}

		// if (!res) throw error(400); // TODO
		// console.log(res);

		// // If there's jwt in the response
		// // it means that account confirmation is disabled in the backend
		// if (res.jwt) {
		// 	cookies.set('jwt', res.jwt, {
		// 		path: '/',
		// 		httpOnly: true,
		// 		sameSite: 'strict',
		// 		maxAge: 60 * 60 * 24 * 30
		// 	});

		// 	throw redirect(307, '/');
		// }

		// // If there's no jwt in the response
		// // Sending to the thanks page, asking then for confirmation
		// throw redirect(307, paths.register.thanks);
	}
};
