import type { PageLoad } from './$types';
import type { LoadReturn } from '$lib/types';
import qs from 'qs';
import { jr, Request, types as t } from 'join-shared';

//

export const load: PageLoad = async ({
	fetch,
	url
}): LoadReturn<t.CourseEntityResponseCollection> => {
	const archive = url.searchParams.get('archive');

	// Building filter query
	const today = new Date().toISOString();
	// Building the filters object
	const gtFilter = { $gt: today };
	const ltFilter = { $lt: today };

	// Building query
	const query = qs.stringify({
		populate: {
			meetings: '*'
		},
		filters: {
			enrollmentDeadline: archive == 'true' ? ltFilter : gtFilter
		}
	});

	const res = await jr.send<t.CourseEntityResponseCollection>({
		fetchImpl: fetch,
		path: `/courses?${query}`,
		method: Request.HTTPMethod.GET
	});

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data) {
		return res.data;
	}
};
