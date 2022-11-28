import type { Actions } from './$types';
import type { types as t } from 'join-shared';
import { routes as r } from 'join-shared';
import type { PageServerLoad } from './$types';
// import { invalid, redirect } from '@sveltejs/kit';
// import paths from '$lib/constants/paths';
// import { setJWTCookie } from '$lib/utils/cookies';

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
	default: async ({ request, fetch }) => {
		const data = await request.formData();

		// const email = data.get('email');
		// const password = data.get('password');
		// const name = data.get('name');
		// const surname = data.get('surname');

		const body: r.Enroll.Req = {
			courseId: course?.id as string,
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

		console.log(body);

		// const res = await r.Enroll.send(body, fetch);

		// if (!res.ok || res.error) {
		// 	// throw error(res.status, res.error?.error.message);
		// 	return invalid(400, { name, surname, email, error: res.error?.error.message });
		// }
		// //
		// else if (res.data) {
		// 	// If there's no jwt, redirect to thank you page
		// 	if (!res.data.jwt) throw redirect(307, paths.register.thanks);

		// 	// If there's jwt in the response
		// 	// it means that account confirmation is disabled in the backend
		// 	setJWTCookie(cookies, res.data.jwt);

		// 	throw redirect(307, paths.login);
		// }
	}
};
