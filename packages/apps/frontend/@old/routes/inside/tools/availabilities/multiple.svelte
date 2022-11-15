<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds, toolDates } from '$lib/stores';
	import { req } from '$lib/requestUtils';

	import Multiple from '$lib/partials/tools/availabilities/multiple.svelte';
	import Container from '$lib/components/container.svelte';

	// Making request
	const promise = req.checkSlots({
		days: $toolNeeds,
		start: new Date().toISOString()
	});

	// Checking validity
	let valid = false;
	$: valid =
		$toolDates.every((e) => e) && $toolDates.length == $toolNeeds.length;

	// Submit
	async function submit() {
		if (valid) {
			await goto('/inside/tools/recap');
		}
	}
</script>

<!--  -->

<Container>
	<div class="space-y-4">
		{#await promise then res}
			{#if res.kind == 'multiple'}
				{#if res.data.length == 0}
					<p class="text-gray-400">Nessun risultato trovato</p>
				{/if}
				{#each res.data as combo}
					<Multiple {combo} on:click={submit} />
				{/each}
			{/if}
		{/await}
	</div>
</Container>
