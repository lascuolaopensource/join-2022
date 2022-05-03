<script lang="ts">
	import Step from './step.svelte';
	import type { StepData } from './step.svelte';

	export let data: Array<StepData>;
</script>

<div>
	{#each data as s, i}
		{#if i != 0}
			<p>&#8594;</p>
		{/if}
		<Step data={s} />
	{/each}
</div>

<style>
	div {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
</style>
