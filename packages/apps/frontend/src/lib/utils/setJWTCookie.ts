import type { Cookies } from '@sveltejs/kit';

export function setJWTCookie(cookies: Cookies, jwt: string) {
	cookies.set('jwt', jwt, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});
}
