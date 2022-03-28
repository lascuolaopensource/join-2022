import type { t, e } from 'shared';
import { request } from './request';
import { headersAuth } from './authorizationHeader';
import qs from 'qs';

// L'URL base, importato dall'.env
export const baseUrl = <string>import.meta.env.VITE_BACKEND_URL;

// Scorciatoia per url base
const b = baseUrl + '/';

// Request manager
export const req = {
	/**
	 * Login
	 */

	loginEmail: async (
		body: e.LoginEmailReq,
		fetchFn = fetch
	): Promise<e.LoginEmailRes> => {
		return await request(fetchFn, b + 'api/login-email', 'POST', body);
	},

	login: async (body: e.LoginReq, fetchFn = fetch): Promise<e.LoginRes> => {
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
		body: e.RegisterUserReq,
		fetchFn = fetch
	): Promise<t.LoginResponse> => {
		return await request(fetchFn, b + 'api/register-user', 'POST', body);
	},

	userExists: async (
		body: e.UserExistsReq,
		fetchFn = fetch
	): Promise<e.UserExistsRes> => {
		return await request(fetchFn, b + 'api/user-exists', 'POST', body);
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

	isUserEnrolled: async (
		courseID: string,
		fetchFn = fetch
	): Promise<e.IsUserEnrolledRes> => {
		return await request(
			fetchFn,
			b + `api/is-user-enrolled/${courseID}`,
			'GET',
			null,
			headersAuth()
		);
	},

	/**
	 * Password
	 */

	forgotPassword: async (body: e.LoginEmailReq, fetchFn = fetch) => {
		return await request(fetchFn, b + 'api/auth/forgot-password', 'POST', body);
	},

	resetPassword: async (body: t.MutationResetPasswordArgs, fetchFn = fetch) => {
		return await request(fetchFn, b + 'api/auth/reset-password', 'POST', body);
	},

	/**
	 * Enrollment
	 */

	enroll: async (body: e.EnrollReq, fetchFn = fetch): Promise<e.EnrollRes> => {
		return await request(
			fetchFn,
			b + 'api/enroll',
			'POST',
			body,
			headersAuth()
		);
	},

	/**
	 * Pay
	 */

	pay: async (
		hash: string,
		body: e.PayReq,
		fetchFn = fetch
	): Promise<e.PayRes> => {
		return await request(
			fetchFn,
			b + `api/pay/${hash}`,
			'POST',
			body,
			headersAuth()
		);
	},

	payConfirm: async (
		code: string,
		fetchFn = fetch
	): Promise<e.PayConfirmRes> => {
		return await request(
			fetchFn,
			b + `api/pay/confirm/${code}`,
			'GET',
			headersAuth()
		);
	},

	getPaymentDetails: async (
		hash: string,
		fetchFn = fetch
	): Promise<e.PayGetPaymentDetailsRes> => {
		return await request(fetchFn, b + `api/pay/get-payment-details/${hash}`);
	},

	/**
	 * Getters
	 */

	getCourseBySlug: async (
		slug: string,
		fetchFn = fetch
	): Promise<t.CourseEntity> => {
		const query = qs.stringify({
			filters: {
				slug: {
					$eq: slug
				}
			}
		});
		const res: t.CourseEntityResponseCollection = await request(
			fetchFn,
			`${b}api/courses?${query}`
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
		// Getting today's date
		const today = new Date().toISOString();
		// Deciding filter based on mode
		// lt: lower than | gt: greater than
		const filterOperator = mode == 'expired' ? '$lt' : '$gt';
		// Building the filters object
		const filters = { enrollmentDeadline: {} };
		filters.enrollmentDeadline[filterOperator] = today;
		// Building query
		const query = qs.stringify({
			populate: {
				meetings: {
					populate: {
						timeSlots: '*'
					}
				}
			},
			filters
		});
		// Requesting...
		return await request(fetchFn, `${b}api/courses?${query}`);
	}
};
