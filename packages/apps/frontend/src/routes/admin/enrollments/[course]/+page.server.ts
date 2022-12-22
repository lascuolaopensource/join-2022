import type { PageServerLoad, Actions } from './$types';
import qs from 'qs';
import { jr, Request, types as t, routes as r, helpers as h } from 'join-shared';
import type { LoadReturn } from '$lib/types';
import { getJWT } from '$lib/utils/cookies';
import { restructure } from '$lib/utils/formData';

/**
 *
 */

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies
}): LoadReturn<{ course: t.CourseEntity }> => {
	const { course: slug } = params;

	// Creating filters
	const query = qs.stringify({
		populate: {
			meetings: '*',
			enrollments: {
				populate: {
					owner: {
						populate: {
							info: '*'
						}
					}
				}
			}
		},
		filters: {
			slug: {
				$eq: slug
			}
		}
	});

	const res = await jr.send<t.CourseEntityResponseCollection>({
		fetchImpl: fetch,
		path: `/courses?${query}`,
		auth: getJWT(cookies),
		method: Request.HTTPMethod.GET
	});

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data.data.length == 0) {
		return { error: 'Course not found' };
	}

	return { course: res.data.data[0] };
};

/**
 *
 */

export const actions: Actions = {
	update: async ({ cookies, request, fetch }) => {
		const data = await request.formData();
		const body = restructure(data);

		const enrollments = JSON.parse(body.enrollments as string) as Array<t.EnrollmentEntity>;
		const cleanedEnrollments = h.Enrollment.getItems(enrollments);

		await r.Admin.Enrollments.Update.send(
			{ items: cleanedEnrollments },
			getJWT(cookies) as string,
			fetch
		);
	},

	confirm: async ({ cookies, request, fetch }) => {
		// const res = await r.Account.Login.send(body, fetch);
		// if (!res.ok || Boolean(res.error)) {
		// 	return invalid(400, { error: res.error?.error.message });
		// }
		// //
		// else if (res.data) {
		// 	setJWTCookie(cookies, res.data.jwt);
		// 	throw redirect(307, '/');
		// }
	}
};
