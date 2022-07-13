<script lang="ts">
	import Step from './step.svelte';
	import type { StepData } from './step.svelte';

	export let data: Array<StepData>;
</script>

<!--  -->

<div class="flex flex-row flex-nowrap space-x-1 items-center justify-start">
	{#each data as s, i}
		{#if i != 0}
			<p>&#8594;</p>
		{/if}
		<Step data={s} />
	{/each}
</div>
