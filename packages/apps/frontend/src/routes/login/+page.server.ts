import type { PageServerLoad, Actions } from './$types';
import type { AppLocals } from '$lib/types/appLocals';

import { invalid, redirect } from '@sveltejs/kit';
import { Request } from '$lib/request';
import { p } from '$lib/request/request';

import { routes as r } from 'join-shared';

//

export const load: PageServerLoad = ({ locals }) => {
	if ((locals as AppLocals).user) throw redirect(307, '/');
};

//

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const email = data.get('email');
		const password = data.get('password');
		console.log(email, password);

		const res = await Request.post(p(r.Account.Login));

		// const body = await Request.post('users/login', {
		// 	user: {
		// 		email: data.get('email'),
		// 		password: data.get('password')
		// 	}
		// });

		// if (body.errors) {
		// 	return invalid(401, body);
		// }

		// const value = Buffer.from(JSON.stringify(body.user), 'base64');
		// cookies.set('jwt', value.toString(), { path: '/' });

		// throw redirect(307, '/');
	}
};
