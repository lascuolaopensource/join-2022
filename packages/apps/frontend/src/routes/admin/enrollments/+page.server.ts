import type { PageServerLoad } from './$types';
import type { LoadReturn } from '$lib/types';
import qs from 'qs';
import { jr, Request, types as t } from 'join-shared';
import { getJWT } from '$lib/utils/cookies';

//

export const load: PageServerLoad = async ({
	fetch,
	url,
	cookies
}): LoadReturn<{ courses: t.CourseEntityResponseCollection }> => {
	const archive = url.searchParams.get('archive');

	// Building filter query
	const today = new Date().toISOString();
	// Building the filters object
	const gtFilter = { $gt: today };
	const ltFilter = { $lt: today };

	// Building query
	const query = qs.stringify({
		populate: {
			meetings: '*',
			enrollments: '*'
		},
		filters: {
			meetings: {
				start: archive == 'true' ? ltFilter : gtFilter
			}
		}
	});

	const res = await jr.send<t.CourseEntityResponseCollection>({
		fetchImpl: fetch,
		path: `/courses?${query}`,
		auth: getJWT(cookies),
		method: Request.HTTPMethod.GET
	});

	// Guard
	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	return { courses: res.data };
};
