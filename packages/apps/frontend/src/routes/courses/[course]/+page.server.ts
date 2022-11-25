import type { PageServerLoad } from './$types';
import qs from 'qs';
import { getJWT } from '$lib/utils/cookies';
import { jr, Request, types as t } from 'join-shared';
import type { LoadReturn } from '$lib/types';

//

export const load: PageServerLoad = async ({
	params,
	cookies,
	fetch
}): LoadReturn<t.CourseEntity> => {
	const jwt = getJWT(cookies);
	const { course: slug } = params;

	// This shouldn't happen, cause the user should be redirected to the login page before this
	// But it's good to have this check here, for type safety
	if (!jwt) {
		console.log('no jwt');
	}
	console.log(slug);

	// Creating filters
	const query = qs.stringify({
		populate: {
			gallery: '*'
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
		auth: jwt,
		method: Request.HTTPMethod.GET
	});

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data.data.length == 0) {
		return { error: 'Course not found' };
	}

	if (res.data) {
		return res.data.data[0];
	}
};
