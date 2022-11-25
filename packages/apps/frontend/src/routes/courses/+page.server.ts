import type { PageServerLoad } from './$types';
import { getJWT } from '$lib/utils/cookies';
import qs from 'qs';
import { jr, Request, types as t } from 'join-shared';

//

export const load: PageServerLoad = async ({
	cookies,
	fetch
}): Promise<t.CourseEntityResponseCollection | { error: string | undefined } | undefined> => {
	const jwt = getJWT(cookies);

	// This shouldn't happen, cause the user should be redirected to the login page before this
	// But it's good to have this check here, for type safety
	if (!jwt) {
		console.log('no jwt');
	}

	// Building query
	const query = qs.stringify({
		populate: {
			meetings: '*',
			gallery: '*'
		},
		filters: {}
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

	// // Getting courses
	// const today = new Date().toISOString();
	// // Deciding filter based on mode
	// // lt: lower than | gt: greater than
	// const filterOperator = mode == 'expired' ? '$lt' : '$gt';
	// // Building the filters object
	// const filters: any = { enrollmentDeadline: {} };
	// filters.enrollmentDeadline[filterOperator] = today;

	// // Requesting...
	// return await request(
	// 	fetchFn,
	// 	`${b}api/courses?${query}`,
	// 	'GET',
	// 	null,
	// 	headersAuth()
	// );
};
