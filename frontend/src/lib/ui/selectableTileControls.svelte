<script lang="ts">
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

<div>
	{#if deselect}
		<button class="btn btn-secondary" on:click={deselectAll}
			>Deseleziona tutti</button
		>
	{/if}
	{#if select}
		<button class="btn btn-secondary" on:click={selectAll}
			>Seleziona tutti</button
		>
	{/if}
</div>
