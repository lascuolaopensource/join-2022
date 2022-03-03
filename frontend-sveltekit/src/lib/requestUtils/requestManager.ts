import type { t, f } from 'shared';
import { request } from '.';
import { headersAuth } from '.';
import { baseUrl } from '.';

const b = baseUrl + '/';

export const req = {
	/**
	 * Login
	 */

	loginEmail: async (
		body: f.loginEmail.leType,
		fetchFn = fetch
	): Promise<f.loginEmail.leResponse> => {
		return await request(fetchFn, b + 'api/loginemail', 'POST', body);
	},

	login: async (
		body: t.UsersPermissionsLoginInput,
		fetchFn = fetch
	): Promise<t.LoginResponse> => {
		return await request(fetchFn, b + 'api/auth/local', 'POST', body);
	},

	/**
	 * User
	 */

	me: async (fetchFn = fetch): Promise<t.UsersPermissionsMe> => {
		return await request(
			fetchFn,
			b + 'api/users/me',
			'GET',
			null,
			headersAuth()
		);
	},

	register: async (
		body: t.UsersPermissionsRegisterInput,
		fetchFn = fetch
	): Promise<t.LoginResponse> => {
		return await request(fetchFn, b + 'api/auth/local/register', 'POST', body);
	},

	userExists: async (
		body: f.userExists.ueType,
		fetchFn = fetch
	): Promise<f.userExists.ueResponse> => {
		return await request(fetchFn, b + 'api/userexists', 'POST', body);
	},

	/**
	 * Password
	 */

	forgotPassword: async (body: f.loginEmail.leType, fetchFn = fetch) => {
		return await request(fetchFn, b + 'api/auth/forgot-password', 'POST', body);
	},

	resetPassword: async (body: t.MutationResetPasswordArgs, fetchFn = fetch) => {
		return await request(fetchFn, b + 'api/auth/reset-password', 'POST', body);
	},

	/**
	 * Enrollment
	 */

	enroll: async (
		body: f.enroll.enRequest,
		fetchFn = fetch
	): Promise<f.enroll.enResponse> => {
		return await request(
			fetchFn,
			b + 'api/enroll',
			'POST',
			body,
			headersAuth()
		);
	},

	pay: async (
		body: f.payment.pType,
		fetchFn = fetch
	): Promise<f.payment.pResType> => {
		return await request(fetchFn, b + 'api/pay', 'POST', body, headersAuth());
	},

	payConfirm: async (
		code: string,
		fetchFn = fetch
	): Promise<f.payment.pConfirmResType> => {
		return await request(
			fetchFn,
			b + `api/pay/confirm/${code}`,
			'GET',
			headersAuth()
		);
	},

	/**
	 * Getters
	 */

	getCourseBySlug: async (
		slug: string,
		fetchFn = fetch
	): Promise<t.CourseEntity> => {
		const res: t.CourseEntityResponseCollection = await request(
			fetchFn,
			b + `api/courses?filters[slug][$eq]=${slug}`,
			'GET'
		);
		if (!res.data[0]) {
			throw new Error('Course not found');
		}
		return res.data[0];
	}
};
