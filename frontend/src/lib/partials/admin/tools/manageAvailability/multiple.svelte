<script lang="ts" context="module">
	export interface EventDetail {
		tools: Array<string>;
		hours: Array<string>;
		days: Array<string>;
	}
</script>

<script lang="ts">
	import { tools } from '$lib/stores';
	import { createEventDispatcher } from 'svelte';

	import { SelectableTile } from '$lib/ui';
	//

	export let days: Array<Date>;
	export let hours: number;

	//

	type SelectableList = Record<string, boolean>;

	let selectedTools: SelectableList = {};
	let selectedDays: SelectableList = {};
	let selectedHours: SelectableList = {};

	// Listing tools
	$tools.forEach((t) => {
		selectedTools[t.id] = false;
	});

	// Listing days
	days.forEach((d) => {
		selectedDays[d.toISOString()] = false;
	});

	// Listing hours
	for (let h; h < hours; h++) {
		selectedHours[h] = false;
	}

	//

	function selectAll(list: SelectableList, b: boolean) {
		for (const id in list) {
			list[id] = b;
		}
	}

	function selectAllTools(b: boolean) {
		selectAll(selectedTools, b);
		selectedTools = selectedTools;
	}

	function selectAllDays(b: boolean) {
		selectAll(selectedDays, b);
		selectedDays = selectedDays;
	}

	function selectAllHours(b: boolean) {
		selectAll(selectedHours, b);
		selectedHours = selectedHours;
	}

	//

	function getSelectedData(list: SelectableList) {
		return Object.keys(list).filter((k) => list[k]);
	}

	function isDataSelected(list: SelectableList) {
		return getSelectedData(list).length > 0;
	}

	const dispatch = createEventDispatcher<{ updateSlots: EventDetail }>();

	function updateSlots() {
		dispatch('updateSlots', {
			days: getSelectedData(selectedDays),
			hours: getSelectedData(selectedHours),
			tools: getSelectedData(selectedTools)
		});
	}

	//

	let selectionExists = false;
	$: {
		selectionExists =
			isDataSelected(selectedDays) &&
			isDataSelected(selectedTools) &&
			isDataSelected(selectedHours);
	}
</script>

<!--  -->

<div class="grid grid-cols-3 gap-4">
	<!-- Tool list -->
	<div class="">
		<!-- Upper controls -->
		<div class="flex flex-row justify-between items-center mb-2">
			<p class="text-slate-500">Seleziona strumenti</p>
			<div>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllTools(false);
					}}>Deseleziona tutti</button
				>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllTools(true);
					}}>Seleziona tutti</button
				>
			</div>
		</div>

		<!-- Actual list -->
		<div class="flex flex-col flex-nowrap gap-2">
			{#each $tools as t}
				<SelectableTile bind:selected={selectedTools[t.id]}
					>{t.attributes.name}</SelectableTile
				>
			{/each}
		</div>

		{JSON.stringify(selectedTools)}
	</div>

	<!-- Days list -->
	<div>
		<!-- Controls -->
		<div class="flex flex-row justify-between items-center mb-2">
			<p class="text-slate-500">Seleziona giorni</p>
			<div>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllDays(false);
					}}>Deseleziona tutti</button
				>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllDays(true);
					}}>Seleziona tutti</button
				>
			</div>
		</div>

		<!-- List -->
		<div class="flex flex-col flex-nowrap gap-2">
			{#each days as d}
				<SelectableTile bind:selected={selectedDays[d.toISOString()]}
					>{d}</SelectableTile
				>
			{/each}
		</div>
	</div>

	<!-- Hours list -->
	<div>
		<!-- Controls -->
		<div class="flex flex-row justify-between items-center mb-2">
			<p class="text-slate-500">Seleziona ore</p>
			<div>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllHours(false);
					}}>Deseleziona tutti</button
				>
				<button
					class="btn btn-secondary"
					on:click={() => {
						selectAllHours(true);
					}}>Seleziona tutti</button
				>
			</div>
		</div>

		<!-- List -->
		<div class="grid grid-cols-3 gap-2">
			{#each { length: hours } as _, h}
				<SelectableTile bind:selected={selectedHours[h]}>{h}:00</SelectableTile>
			{/each}
		</div>
	</div>
</div>

<button
	class="btn btn-primary"
	disabled={!selectionExists}
	on:click={updateSlots}>Save</button
>
