<script context="module" lang="ts">
	import { req } from '$lib/requestUtils';
	import { t } from 'shared';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const res = await req.payConfirm(params.code, fetch);

		if (res.confirmed) {
			if (res.details.category == t.PaymentCategories.course) {
				return {
					status: 302,
					redirect: `/shared/${encodeURIComponent(
						res.details.title
					)}/enrollConfirm`
				};
			}
		} else {
			return {
				status: 404
			};
		}
	}
</script>
