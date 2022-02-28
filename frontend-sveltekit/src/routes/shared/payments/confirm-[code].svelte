<script context="module" lang="ts">
	import { endpoints } from '$lib/requestUtils';
	import type { f } from 'shared';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		// Creating body
		const body: f.payment.pConfirmType = {
			confirmCode: params.code
		};

		// Sending request
		const res = await fetch(endpoints.payConfirm, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const resCont = await res.json();

		return {
			props: {
				confirm: resCont
			}
		};
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	export let confirm: boolean;

	if (confirm) {
		goto('/');
	}
</script>

hey
