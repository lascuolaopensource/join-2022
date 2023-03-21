import type { Actions } from './$types';
import type { types as t } from 'join-shared';
import { routes as r } from 'join-shared';
import type { PageServerLoad } from './$types';
import paths from '$lib/constants/paths';
import { getJWT } from '$lib/utils/cookies';
import { redirect } from '@sveltejs/kit';
import { restructure } from '$lib/utils/formData';

//

let course: t.CourseEntity | null | undefined = null;

//

export const load: PageServerLoad = async ({ parent }) => {
	// Loads course data from parent layout
	// In order to use it in the action, where needed
	const { course: c } = await parent();
	course = c;

	return {};
};

//

export const actions: Actions = {
	default: async ({ request, fetch, cookies }) => {
		const data = await request.formData();
		const jwt = getJWT(cookies);
		const body = restructure(data) as r.Enroll.Req;
		const res = await r.Enroll.send(course?.id as string, body, jwt, fetch);

		if (!res.ok || res.error) {
			return { error: res.error?.error.message };
		}
		//
		else if (res.data) {
			if (res.data.paymentUID) throw redirect(307, paths.payment.index(res.data.paymentUID));
			else
				throw redirect(
					307,
					paths.courses.enroll.thanks(course?.attributes?.slug as string)
				);
		}
	}
};
