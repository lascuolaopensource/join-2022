import type { Handle } from '@sveltejs/kit';
import { routes } from 'join-shared';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('jwt');

	// If there is no session load page as normal
	if (!token) {
		return await resolve(event);
	}

	const res = await routes.Account.Me.send(token, event.fetch);
	const user = res.data;

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
