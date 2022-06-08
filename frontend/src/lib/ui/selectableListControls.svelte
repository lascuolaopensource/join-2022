<script lang="ts">
	import { getCtx } from './selectableList.svelte';

	const { items, selection } = getCtx();

	function selectAll() {
		$selection = $items;
	}

	function deselectAll() {
		$selection = [];
	}
</script>

<!--  -->

<div>
	<button class="btn btn-secondary" on:click={deselectAll}
		>Deseleziona tutti</button
	>
	<button class="btn btn-secondary" on:click={selectAll}>Seleziona tutti</button
	>
</div>
