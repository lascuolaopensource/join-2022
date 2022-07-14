<script lang="ts">
	import Button from './button.svelte';

	export let values: Array<any>;
	export let group: Array<any>;
	export let select = true;
	export let deselect = true;

	function selectAll() {
		group = values;
	}

	function deselectAll() {
		group = [];
	}
</script>

<!--  -->

<div class="flex flex-row flex-nowrap justify-end items-center space-x-1">
	{#if deselect}
		<Button hierarchy="secondary" on:click={deselectAll}
			>Deseleziona tutti</Button
		>
	{/if}
	{#if select}
		<Button hierarchy="secondary" on:click={selectAll}>Seleziona tutti</Button>
	{/if}
</div>
