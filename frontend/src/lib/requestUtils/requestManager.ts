import type { types as t, endpoints as e } from 'shared';
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

	//

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

	//

	register: async (
		body: e.RegisterUserReq,
		fetchFn = fetch
	): Promise<t.LoginResponse> => {
		return await request(fetchFn, b + 'api/register-user', 'POST', body);
	},

	//

	userExists: async (
		body: e.UserExistsReq,
		fetchFn = fetch
	): Promise<e.UserExistsRes> => {
		return await request(fetchFn, b + 'api/user-exists', 'POST', body);
	},

	//

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

	//

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

	//

	getRole: async (fetchFn = fetch): Promise<e.GetUserRelationsRoleRes> => {
		return await request(
			fetchFn,
			b + `api/get-user-relations/role`,
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

	//

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

	//

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

	//

	getPaymentDetails: async (
		hash: string,
		fetchFn = fetch
	): Promise<e.PayGetPaymentDetailsRes> => {
		return await request(fetchFn, b + `api/pay/get-payment-details/${hash}`);
	},

	/**
	 * Getters
	 */

	getCourseByID: async (
		ID: string,
		query = '',
		fetchFn = fetch
	): Promise<t.CourseEntityResponse> => {
		let url = `${b}api/courses/${ID}`;
		if (query) url += `?${query}`;
		return await request(fetchFn, url);
	},

	//

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
			`${b}api/courses?${query}`,
			'GET',
			null,
			headersAuth()
		);
		if (!res.data[0]) {
			throw new Error('Course not found');
		}
		return res.data[0];
	},

	//

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
		const filters: any = { enrollmentDeadline: {} };
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
		return await request(
			fetchFn,
			`${b}api/courses?${query}`,
			'GET',
			null,
			headersAuth()
		);
	},

	//

	getUserEnrollments: async (
		fetchFn = fetch
	): Promise<e.GetUserRelationsEnrollmentsRes> => {
		return await request(
			fetchFn,
			`${b}api/get-user-relations/enrollments`,
			'GET',
			null,
			headersAuth()
		);
	},

	/**
	 * Admin stuff
	 */

	adminGetUpcomingCourses: async (
		fetchFn = fetch
	): Promise<e.AdminEnrollmentsGetUpcomingCoursesRes> => {
		return await request(
			fetchFn,
			`${b}api/admin-enrollments/get-upcoming-courses`,
			'GET',
			null,
			headersAuth()
		);
	},

	//

	adminGetCourseEnrollments: async (
		courseID: number | string,
		fetchFn = fetch
	): Promise<t.CourseEntityResponse> => {
		const query = qs.stringify(
			{
				populate: {
					meetings: {
						populate: '*'
					},
					enrollments: {
						populate: {
							owner: {
								populate: ['userInfo']
							},
							phoneNumber: {
								populate: '*'
							}
						}
					}
				}
			},
			{
				encodeValuesOnly: true
			}
		);

		return await request(
			fetchFn,
			`${b}api/courses/${courseID}?${query}`,
			'GET',
			null,
			headersAuth()
		);
	},

	//

	adminUpdateEnrollments: async (
		data: e.AdminEnrollmentsUpdateReq,
		fetchFn = fetch
	) => {
		return await request(
			fetchFn,
			`${b}api/admin-enrollments/update`,
			'POST',
			data,
			headersAuth()
		);
	},

	/**
	 * Tools admin
	 */

	getTools: async (
		fetchFn = fetch
	): Promise<t.ToolEntityResponseCollection> => {
		return await request(fetchFn, `${b}api/tools`, 'GET', null, headersAuth());
	},

	//

	getToolsSlots: async (
		startDate: string,
		endDate: string,
		pageNumber: number,
		pageSize: number,
		fetchFn = fetch
	): Promise<t.ToolSlotEntityResponseCollection> => {
		const query = qs.stringify(
			{
				pagination: {
					page: pageNumber,
					pageSize: pageSize
				},
				filters: {
					$and: [{ start: { $gte: startDate } }, { end: { $lte: endDate } }]
				},
				populate: {
					tool: {
						fields: ['id']
					}
				}
			},
			{
				encodeValuesOnly: true
			}
		);
		return await request(
			fetchFn,
			`${b}api/tool-slots?${query}`,
			'GET',
			null,
			headersAuth()
		);
	},
	//

	adminEnrollmentsCloseCourse: async (
		courseID: string | number,
		fetchFn = fetch
	) => {
		return await request(
			fetchFn,
			`${b}api/admin-enrollments/close-course/${courseID}`,
			'GET',
			null,
			headersAuth()
		);
	},

	getToolSlotsLoop: async (dateStart: Date, dateEnd: Date) => {
		const slots: Array<t.ToolSlotEntity> = [];

		// Fetching the first batch of the slots
		const res = await req.getToolsSlots(
			dateStart.toISOString(),
			dateEnd.toISOString(),
			1,
			100
		);
		// Saving
		slots.push(...res.data);

		// Fetching the other pages
		for (let i = 0; i < res.meta.pagination.pageCount - 1; i++) {
			const res = await req.getToolsSlots(
				dateStart.toISOString(),
				dateEnd.toISOString(),
				2 + i,
				100
			);
			slots.push(...res.data);
		}

		return slots;
	},

	//

	updateSlots: async (data: e.AdminToolsUpdateSlotsReq, fetchFn = fetch) => {
		return await request(
			fetchFn,
			`${b}api/admin-tools/update-slots`,
			'POST',
			data,
			headersAuth()
		);
	},

	//

	getToolsBookings:
		async (): Promise<t.ToolsBookingEntityResponseCollection> => {
			const query = qs.stringify(
				{
					populate: {
						slots: {
							populate: ['tool']
						},
						owner: {
							populate: ['userInfo']
						}
					},
					filters: {
						slots: {
							start: {
								$gt: new Date().toISOString()
							}
						}
					}
				},
				{
					encodeValuesOnly: true
				}
			);

			return await request(
				fetch,
				`${b}api/tools-bookings?${query}`,
				'GET',
				null,
				headersAuth()
			);
		},

	deleteBooking: async (id: string) => {
		await request(
			fetch,
			`${b}api/admin-tools/delete-booking/${id}`,
			'GET',
			null,
			headersAuth()
		);
	},

	/**
	 * Tools client
	 */

	checkSlots: async (
		data: e.BookToolsCheckAvailabilityReq,
		fetchFn = fetch
	): Promise<e.BookToolsCheckAvailabilityRes> => {
		return await request(
			fetchFn,
			`${b}api/book-tools/check-availability`,
			'POST',
			data,
			headersAuth()
		);
	},

	bookTools: async (data: e.BookToolsReq, fetchFn = fetch) => {
		return await request(
			fetchFn,
			`${b}api/book-tools/book`,
			'POST',
			data,
			headersAuth()
		);
	}
};
