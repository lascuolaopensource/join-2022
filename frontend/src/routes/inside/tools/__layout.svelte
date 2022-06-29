<script lang="ts">
	import { req } from '$lib/requestUtils';
	import { tools } from '$lib/stores';

	import { Steps } from '$lib/components';
	import type { StepData } from '$lib/components/step.svelte';

	const data: Array<StepData> = [
		{ href: '/inside/tools', label: 'Start' },
		{ href: '/inside/tools/needs', label: 'Cosa' },
		{ href: '/inside/tools/availabilities', label: 'Quando' },
		{ href: '/inside/tools/recap', label: 'Recap' }
	];

	// Fetching tools
	const promise = (async () => {
		const res = await req.getTools();
		$tools = [...res.data];
	})();
</script>

<!--  -->

{#await promise}
	loading
{:then res}
	<div class="container mx-auto p-6">
		<Steps {data} />
	</div>
	<slot />
{/await}
