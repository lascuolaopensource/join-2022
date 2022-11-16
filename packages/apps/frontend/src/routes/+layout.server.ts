import type { LayoutServerLoad } from './$types';
import { routes } from 'join-shared';

//

export const load: LayoutServerLoad = async ({ cookies, fetch, locals }) => {
	const token = cookies.get('jwt');

	// If there is no session load page as normal
	if (!token) {
		return {
			user: null
		};
	}

	const user = await routes.Account.Me.send(token, fetch);
	locals.user = user;

	return {
		user
	};
};
