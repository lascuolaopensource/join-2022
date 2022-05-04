<script lang="ts" context="module">
	export const miniCalCellStates = ['free', 'booked', 'blocked'] as const;
	export type MiniCalCellState = typeof miniCalCellStates[number];

	export type EventDetail = {
		dateTime: Date;
		state: MiniCalCellState;
		edited: boolean;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let dateTime: Date;
	export let state: MiniCalCellState = 'free';

	let edited = false;
	let editable = state == 'booked' ? false : true;

	//

	const dispatch = createEventDispatcher<{ edit: EventDetail }>();

	function edit() {
		if (editable) {
			state = state == 'free' ? 'blocked' : 'free';
			edited = edited ? false : true;

			dispatch('edit', {
				dateTime,
				state,
				edited
			});
		}
	}
</script>

<!--  -->

<div
	class:free={state == 'free'}
	class:booked={state == 'booked'}
	class:blocked={state == 'blocked'}
	class:edited
	on:click={edit}
>
	<slot />
</div>

<!--  -->
<style>
	div {
		width: 100%;
		height: 100%;
	}

	.booked {
		background-color: red;
	}

	.free {
		background-color: white;
	}

	.free.edited {
		background-color: blue;
		box-shadow: inset 0px 0px 0px 5px white;
	}

	.blocked {
		background-color: gray;
	}

	.blocked.edited {
		background-color: white;
		box-shadow: inset 0px 0px 0px 5px blue;
	}

	.free:hover,
	.blocked:hover {
		cursor: pointer;
	}
</style>
