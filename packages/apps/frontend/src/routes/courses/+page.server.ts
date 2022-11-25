import type { PageServerLoad } from './$types';
import { getJWT } from '$lib/utils/cookies';
import qs from 'qs';
import { jr, Request, types as t } from 'join-shared';

//

export const load: PageServerLoad = async ({
	cookies,
	fetch,
	url
}): Promise<t.CourseEntityResponseCollection | { error: string | undefined } | undefined> => {
	const jwt = getJWT(cookies);
	const archive = url.searchParams.get('archive');

	// This shouldn't happen, cause the user should be redirected to the login page before this
	// But it's good to have this check here, for type safety
	if (!jwt) {
		console.log('no jwt');
	}

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
		auth: jwt,
		method: Request.HTTPMethod.GET
	});

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data) {
		return res.data;
	}
};
