<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds, toolDates } from '$lib/stores';
	import { req } from '$lib/requestUtils';

	import Multiple from '$lib/partials/tools/availabilities/multiple.svelte';

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

<div class="container mx-auto px-6 space-y-4">
	{#await promise then res}
		{#if res.kind == 'multiple'}
			{#each res.data as combo}
				<Multiple {combo} on:click={submit} />
			{/each}
		{/if}
	{/await}
</div>
