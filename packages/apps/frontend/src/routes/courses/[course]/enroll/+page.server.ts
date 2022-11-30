import type { Actions } from './$types';
import type { types as t } from 'join-shared';
import { routes as r } from 'join-shared';
import type { PageServerLoad } from './$types';
// import { invalid, redirect } from '@sveltejs/kit';
import paths from '$lib/constants/paths';
import { getJWT } from '$lib/utils/cookies';
import { redirect } from '@sveltejs/kit';

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

		const body: r.Enroll.Req = {
			contacts: {
				email: data.get('contacts.email') as string,
				phone: data.get('contacts.phone') as string,
				name: data.get('contacts.name') as string,
				surname: data.get('contacts.surname') as string
			},
			evaluation: {
				letter: data.get('evaluation.letter') as string,
				cv: data.get('evaluation.cv') as string,
				portfolio: data.get('evaluation.portfolio') as string
			}
		};

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
