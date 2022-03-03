<script context="module" lang="ts">
	import { req } from '$lib/requestUtils';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		const res = await req.payConfirm(params.code, fetch);

		return {
			props: {
				confirm: res.confirmed
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
