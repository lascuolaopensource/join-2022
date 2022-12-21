import type { PageServerLoad } from './$types';
import { routes as r, types as t } from 'join-shared';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { code } = params;

	const res = await r.Pay.Confirm.send(code);

	console.log(res.data);
	console.log(res.data?.category === t.PaymentCategories.course);

	if (res.data?.category === t.PaymentCategories.course) {
		throw redirect(307, `/courses/${res.data.id}/enroll/thanks`);
	}

	return {};
};
