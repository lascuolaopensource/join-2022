<script lang="ts" context="module">
	export interface EventDetail {
		tools: Array<t.ToolEntity>;
		dates: Array<Date>;
		times: Array<number>;
	}
</script>

<script lang="ts">
	import { tools } from '$lib/stores';
	import { writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { helpers as h, types as t } from 'shared';
	import { BottomBar, Button } from '$lib/components';

	import {
		SelectableTile,
		SelectableList,
		SelectableListControls
	} from '$lib/ui';

	//

	export let dates: Array<Date>;
	export let times: Array<number>;

	//

	let selectedTools = writable<Array<t.ToolEntity>>([]);
	let selectedDates = writable<Array<Date>>([]);
	let selectedTimes = writable<Array<number>>([]);

	const dispatch = createEventDispatcher<{ updateSlots: EventDetail }>();

	function updateSlots() {
		dispatch('updateSlots', {
			tools: [...$selectedTools],
			dates: [...$selectedDates],
			times: [...$selectedTimes]
		});
	}

	let selectionExists = false;
	$: selectionExists =
		$selectedTools.length > 0 &&
		$selectedDates.length > 0 &&
		$selectedTimes.length > 0;
</script>

<!--  -->

<div class="grid grid-cols-3 gap-4">
	<!-- Tool list -->
	<SelectableList selection={selectedTools}>
		<div class="mb-2">
			<SelectableListControls />
		</div>
		<div class="space-y-1">
			{#each $tools as tool}
				<SelectableTile item={tool}>{tool.attributes?.name}</SelectableTile>
			{/each}
		</div>
	</SelectableList>

	<!-- Days list -->
	<SelectableList selection={selectedDates}>
		<div class="mb-2">
			<SelectableListControls />
		</div>
		<div class="space-y-1">
			{#each dates as date}
				<SelectableTile item={date}>{date}</SelectableTile>
			{/each}
		</div>
	</SelectableList>

	<!-- Hours list -->
	<SelectableList selection={selectedTimes}>
		<div class="mb-2">
			<SelectableListControls />
		</div>
		<div class="grid grid-cols-3 gap-1">
			{#each times as time}
				<SelectableTile item={time}>{h.date.msToHHMM(time)}</SelectableTile>
			{/each}
		</div>
	</SelectableList>
</div>

{#if selectionExists}
	<BottomBar spaceBetween>
		<p class="text-base">Ci sono modifiche</p>
		<Button on:click={updateSlots}>Salva</Button>
	</BottomBar>
{/if}
