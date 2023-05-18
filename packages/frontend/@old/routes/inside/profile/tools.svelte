<script lang="ts">
	import { req } from '$lib/requestUtils';
	import type { types as t } from 'shared';

	import { Loading, Callout } from '$lib/components';
	import CardToolsBooking from '$lib/partials/profile/cardToolsBooking.svelte';

	let promise = getData();
	let bookings: Array<t.ToolsBooking> = [];

	async function getData() {
		bookings = await req.getUserToolsBooking();
	}
</script>

<!--  -->

{#await promise}
	<Loading />
{:then res}
	<div class="space-y-4">
		{#if bookings.length > 0}
			<Callout>
				Per annullare una prenotazione, contatta il team Hackerspace
			</Callout>

			{#each bookings as toolsBooking}
				<CardToolsBooking {toolsBooking} />
			{/each}
		{:else}
			<p class="text-gray-400">Non ci sono prenotazioni</p>
		{/if}
	</div>
{/await}
