<script context="module" lang="ts">
	import { endpoints } from '$lib/requestUtils';
	import type { f } from 'shared';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		// Sending request
		const res = await fetch(endpoints.payConfirm + `/${params.code}`);

		const resCont: f.payment.pConfirmResType = await res.json();

		return {
			props: {
				confirm: resCont.confirmed
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { lsKeys } from '$lib/localStorageUtils';

	export let confirm: boolean;

	// Clearing form stored in localstorage
	localStorage.removeItem(lsKeys.paymentForm);

	if (confirm) {
		goto('/');
	}
</script>

hey
