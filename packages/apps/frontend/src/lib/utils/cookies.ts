import type { Cookies } from '@sveltejs/kit';

const JWT = 'jwt';

export function setJWTCookie(cookies: Cookies, jwt: string) {
	cookies.set(JWT, jwt, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30
	});
}

export function getJWT(cookies: Cookies) {
	return cookies.get(JWT);
}
