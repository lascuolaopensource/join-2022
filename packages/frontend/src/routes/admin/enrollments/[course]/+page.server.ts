import type { PageServerLoad, Actions } from './$types';
import qs from 'qs';
import { jr, Request, types as t, routes as r, helpers as h } from 'join-shared';
import type { LoadReturn } from '$lib/types';
import { getJWT } from '$lib/utils/cookies';
import { restructure } from '$lib/utils/formData';

//

let courseID = '';

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

	const course = res.data.data[0];
	courseID = course.id as string;

	return { course };
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

	confirm: async ({ cookies, fetch }) => {
		await r.Admin.Enrollments.ConfirmCourse.send(courseID, getJWT(cookies) as string, fetch);
	}
};
