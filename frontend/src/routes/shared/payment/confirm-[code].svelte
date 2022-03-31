<script context="module" lang="ts">
	import { req } from '$lib/requestUtils';
	import { types as t } from 'shared';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const res = await req.payConfirm(params.code, fetch);

		if (res.confirmed) {
			if (res.details.category == t.PaymentCategories.course) {
				return {
					status: 302,
					redirect: `/shared/enroll/confirm`
				};
			}
		} else {
			return {
				status: 404
			};
		}
	}
</script>
