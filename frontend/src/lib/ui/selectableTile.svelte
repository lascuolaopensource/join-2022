<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getCtx } from './selectableList.svelte';

	//

	export let item: any;

	//

	// Getting context
	const { selection, items } = getCtx();

	// Handling creation and destruction
	onMount(() => {
		// Adding item to context
		$items = [...$items, item];
	});

	onDestroy(() => {
		// Removing from context
		removeItemFromArray($items, item);
		removeItemFromArray($selection, item);
		$selection = [...$selection];
	});

	// Checking if item is selected
	let selected = false;
	$: selected = $selection.includes(item);

	// Updating selection
	function updateSelection() {
		if (selected) {
			removeItemFromArray($selection, item);
		} else {
			$selection.push(item);
		}
		$selection = [...$selection];
	}

	// Utils
	function removeItemFromArray(array: Array<any>, item: any) {
		const index = array.indexOf(item);
		if (index >= 0) {
			array.splice(index, 1);
		}
	}
</script>

<!--  -->

<div
	on:click={updateSelection}
	class="p-2"
	class:bg-slate-200={!selected}
	class:bg-blue-400={selected}
>
	<slot />
</div>
