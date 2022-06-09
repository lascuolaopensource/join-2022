<script lang="ts" context="module">
	export interface EventDetail {
		tools: Array<t.ToolEntity>;
		dates: Array<Date>;
		times: Array<number>;
	}
</script>

<script lang="ts">
	import { tools } from '$lib/stores';
	import type { Writable } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';
	import { helpers as h, types as t } from 'shared';

	import { SelectableTile, SelectableTileControls } from '$lib/ui';
	import { BottomBar, Button, Modal } from '$lib/components';

	//

	export let visible: Writable<boolean>;
	export let dates: Array<Date>;
	export let times: Array<number>;

	//

	let selectedTools: Array<t.ToolEntity> = [];
	let selectedDates: Array<Date> = [];
	let selectedTimes: Array<number> = [];

	const dispatch = createEventDispatcher<{ updateSlots: EventDetail }>();

	function updateSlots() {
		dispatch('updateSlots', {
			tools: [...selectedTools],
			dates: [...selectedDates],
			times: [...selectedTimes]
		});
	}

	let selectionExists = false;
	$: selectionExists =
		selectedTools.length > 0 &&
		selectedDates.length > 0 &&
		selectedTimes.length > 0;
</script>

<!--  -->
<Modal {visible} title="Modifica multipla">
	<div class="grid grid-cols-3 gap-4">
		<!-- Tool list -->
		<div>
			<div class="mb-2">
				<SelectableTileControls values={$tools} bind:group={selectedTools} />
			</div>
			<div class="space-y-1">
				{#each $tools as tool}
					<SelectableTile value={tool} bind:group={selectedTools}
						>{tool.attributes?.name}</SelectableTile
					>
				{/each}
			</div>
		</div>

		<!-- Days list -->
		<div>
			<div class="mb-2">
				<SelectableTileControls values={dates} bind:group={selectedDates} />
			</div>
			<div class="space-y-1">
				{#each dates as date}
					<SelectableTile value={date} bind:group={selectedDates}
						>{date}</SelectableTile
					>
				{/each}
			</div>
		</div>

		<!-- Hours list -->
		<div>
			<div class="mb-2">
				<SelectableTileControls values={times} bind:group={selectedTimes} />
			</div>
			<div class="grid grid-cols-3 gap-1">
				{#each times as time}
					<SelectableTile value={time} bind:group={selectedTimes}
						>{h.date.msToHHMM(time)}</SelectableTile
					>
				{/each}
			</div>
		</div>
	</div>

	<svelte:fragment slot="bottom">
		{#if selectionExists}
			<BottomBar>
				<div class="flex flex-row flex-nowrap items-center justify-between">
					<p class="text-base">Ci sono modifiche</p>
					<Button on:click={updateSlots}>Salva</Button>
				</div>
			</BottomBar>
		{/if}
	</svelte:fragment>
</Modal>
