import type { PageServerLoad } from './$types';
import type { LoadReturn } from '$lib/types';
import { routes as r } from 'join-shared';
import { redirect, type Actions } from '@sveltejs/kit';
import { restructure } from '$lib/utils/formData';

//

export const load: PageServerLoad = async ({
	fetch,
	params
}): LoadReturn<{ info: r.Pay.GetInfo.Res }> => {
	const { id } = params;
	const res = await r.Pay.GetInfo.send(id, fetch);

	if (!res.ok || !res.data) {
		return { error: res.error?.error.message };
	}

	if (res.data) {
		return { info: res.data };
	}
};

//

export const actions: Actions = {
	default: async ({ request, fetch, params }) => {
		const { id } = params;
		const data = await request.formData();
		const body = restructure(data) as r.Pay.Execute.Req;

		// Doing some cleanup
		const unusedOptions = r.Billing.Options.filter((i) => i != body.billingOption);
		for (const i of unusedOptions) {
			body[i] = null;
		}

		const res = await r.Pay.Execute.send(id as string, body, fetch);

		if (!res.ok || res.error) {
			return { error: res.error?.error.message };
		}
		//
		else if (res.data) {
			throw redirect(307, res.data.sessionUrl as string);
		}
	}
};
