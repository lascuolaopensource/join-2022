<script lang="ts" context="module">
	export interface EventDetail {
		id: string;
		selected: boolean;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let name: string;
	export let selected = false;

	const dispatch = createEventDispatcher();

	const selection = () => {
		selected = !selected;

		const detail: EventDetail = {
			id,
			selected
		};
		dispatch('selection', detail);
	};
</script>

<!--  -->

<div on:click={selection} class:selected>
	<input type="checkbox" {name} {id} bind:checked={selected} />
	<p>{name}</p>
</div>

<!--  -->
<style>
	div {
		display: flex;
		flex-flow: row nowrap;
		padding: var(--s-2);
		border: 1px solid gray;
	}

	.selected {
		background-color: aliceblue;
	}

	input {
		margin-right: var(--s-1);
	}
</style>
