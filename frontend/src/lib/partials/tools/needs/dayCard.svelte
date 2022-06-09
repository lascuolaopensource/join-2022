<script lang="ts">
	import { writable } from 'svelte/store';
	import { tools } from '$lib/stores';
	import type { endpoints as e } from 'shared';
	import _ from 'lodash';

	import Modal from '$lib/components/modal.svelte';
	import { IconButton, Button } from '$lib/components';
	import {
		SelectableTile,
		SelectableTileControls,
		CardWithButton
	} from '$lib/ui';

	import { icons } from '$lib/icons';

	//

	export let day: e.ToolNeedsDay;

	//

	function deselectTool(id: string) {
		const index = day.tools.indexOf(id);
		if (index >= 0) {
			day.tools.splice(index, 1);
			day.tools = day.tools;
		}
	}

	const toolIDs = $tools.map((t) => t.id);

	let ready = false;
	$: ready = day.tools.length > 0;

	//

	const showModal = writable(false);
	const close = () => {
		$showModal = false;
	};
	const open = () => {
		$showModal = true;
	};
</script>

<!--  -->

<div class="border-2 p-4">
	<div class="flex flex-row items-center justify-between">
		<h2>Giorno {day.id + 1}</h2>
		<IconButton icon={icons.close} on:click />
	</div>

	<hr class="my-4" />

	<div class="mb-4 space-y-2">
		<p class="text-gray-600">Cosa ti serve?</p>
		<div class="space-y-2">
			{#each day.tools as t}
				{@const tool = _.find($tools, { id: t })}
				<CardWithButton
					showButton
					on:click={() => {
						deselectTool(t);
					}}
				>
					{tool?.attributes?.name}
				</CardWithButton>
			{/each}
		</div>
		<Button hierarchy="secondary" fullWidth on:click={open}
			>+ Aggiungi strumenti</Button
		>
	</div>

	<div>
		<p class="text-gray-600">Per quante ore?</p>
		<input
			class="w-full p-2 mt-2 bg-gray-300 hover:bg-gray-400"
			type="number"
			id="hours"
			name="hours"
			min="1"
			max="24"
			step="1"
			bind:value={day.hours}
		/>
	</div>
</div>

<!--  -->

<Modal visible={showModal} title="Seleziona uno strumento">
	<div class="mb-4 flex flex-row flex-nowrap justify-end">
		<SelectableTileControls
			values={toolIDs}
			bind:group={day.tools}
			select={false}
		/>
	</div>
	<div class="space-y-1">
		{#each $tools as tool}
			<SelectableTile value={tool.id} bind:group={day.tools}
				>{tool.attributes?.name}</SelectableTile
			>
		{/each}
	</div>

	<svelte:fragment slot="bottom">
		<div
			class="px-4 pb-4 pt-2 sticky bottom-0 bg-white flex flex-row justify-end"
		>
			<Button disabled={!ready} on:click={close}>Salva</Button>
		</div>
	</svelte:fragment>
</Modal>
