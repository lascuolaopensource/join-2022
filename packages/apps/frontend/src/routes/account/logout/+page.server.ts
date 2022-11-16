import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import paths from '$lib/constants/paths';

export const load: PageServerLoad = async ({ cookies }) => {
	// eat the cookie
	cookies.set('jwt', '', {
		path: '/',
		expires: new Date(0)
	});

	// redirect the user
	throw redirect(302, paths.login);
};
