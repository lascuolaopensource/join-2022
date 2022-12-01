import type { PageServerLoad } from './$types';
import type { LoadReturn } from '$lib/types';
import { routes as r } from 'join-shared';

//

export const load: PageServerLoad = async ({
	fetch,
	params
}): LoadReturn<{ info: r.Pay.GetInfo.Res }> => {
	const { payment } = params;
	const res = await r.Pay.GetInfo.send(payment, fetch);

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data) {
		return { info: res.data };
	}
};
