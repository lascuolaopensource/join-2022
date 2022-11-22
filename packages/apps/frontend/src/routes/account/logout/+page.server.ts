import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import paths from '$lib/constants/paths';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, '/');
};

export const actions: Actions = {
	default({ cookies }) {
		// eat the cookie
		cookies.set('jwt', '', {
			path: '/',
			expires: new Date(0)
		});

		// redirect the user
		throw redirect(302, paths.login);
	}
};
