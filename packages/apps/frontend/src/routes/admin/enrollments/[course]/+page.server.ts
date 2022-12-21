import type { PageServerLoad } from './$types';
import qs from 'qs';
import { jr, Request, types as t } from 'join-shared';
import type { LoadReturn } from '$lib/types';
import { getJWT } from '$lib/utils/cookies';

//

export const load: PageServerLoad = async ({
	params,
	fetch,
	cookies
}): LoadReturn<{ course: t.CourseEntity }> => {
	const { course: slug } = params;

	// Creating filters
	const query = qs.stringify({
		populate: {
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

	if (res.data) {
		return { course: res.data.data[0] };
	}
};
