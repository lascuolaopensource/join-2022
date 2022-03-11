import type { t, f } from 'shared';
import { request } from './request';
import { headersAuth } from './authorizationHeader';
import { baseUrl } from './baseUrl';

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
		body: f.register.reType,
		fetchFn = fetch
	): Promise<t.LoginResponse> => {
		return await request(fetchFn, b + 'api/register-user', 'POST', body);
	},

	userExists: async (
		body: f.userExists.ueType,
		fetchFn = fetch
	): Promise<f.userExists.ueResponse> => {
		return await request(fetchFn, b + 'api/userexists', 'POST', body);
	},

	getUserInfo: async (
		userId: string | number,
		fetchFn = fetch
	): Promise<t.UserInfoEntity> => {
		const res: t.UserInfoEntityResponseCollection = await request(
			fetchFn,
			b + `api/user-infos?filters[owner][id][$eq]=${userId}`,
			'GET',
			null,
			headersAuth()
		);
		if (!res.data[0]) {
			throw new Error('UserInfo not found');
		}
		return res.data[0];
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
			b + `api/courses?filters[slug][$eq]=${slug}`
		);
		if (!res.data[0]) {
			throw new Error('Course not found');
		}
		return res.data[0];
	},

	getCoursesByDeadline: async (
		mode: 'expired' | 'future',
		fetchFn = fetch
	): Promise<t.CourseEntityResponseCollection> => {
		const today = new Date().toISOString();
		const filter = mode == 'expired' ? 'lt' : 'gt';
		return await request(
			fetchFn,
			b +
				`api/courses?filters[enrollmentDeadline][$${filter}]=${today}&populate[0]=meetings&populate[1]=meetings.timeSlots`
		);
	}
};
