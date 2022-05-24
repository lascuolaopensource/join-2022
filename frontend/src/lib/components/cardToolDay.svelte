<script lang="ts">
	import type { types as t, endpoints as e } from 'shared';

	import Modal, { open } from './modal.svelte';
	import IconButton from './iconButton.svelte';
	import CardToolSelect from './cardToolSelect.svelte';
	import CardToolSelected from './cardToolSelected.svelte';
	import type { EventDetail } from './cardToolSelect.svelte';

	import { icons } from '$lib/icons';

	//

	export let index: number;
	export let tools: Array<t.ToolEntity>;
	export let day: e.BookToolsCheckAvailabilityDay;

	let selectedTools = day.tool_ids;

	//

	function handleSelection(e: CustomEvent<EventDetail>) {
		const { id, selected } = e.detail;
		// Adding or removing
		if (selected) {
			selectedTools.push(id);
		} else {
			deselectTool(id);
		}
		// Reassign to trigger update
		selectedTools = selectedTools;
	}

	function deselectTool(id: string) {
		if (selectedTools.includes(id)) {
			selectedTools.splice(selectedTools.indexOf(id), 1);
			selectedTools = selectedTools;
		}
	}

	function getToolById(id: string): t.ToolEntity {
		for (let t of tools) {
			if (t.id == id) return t;
		}
	}
</script>

<!--  -->

<div class="container">
	<div class="header">
		<h2>Giorno {index}</h2>
		<IconButton icon={icons.close} backgroundColor="lightgray" on:click />
	</div>

	<hr />

	<p><strong>Cosa ti serve?</strong></p>
	<div class="space-between tools-selected">
		{#each selectedTools as t (t)}
			{@const tool = getToolById(t)}
			{#if tool}
				<CardToolSelected
					text={tool.attributes.name}
					icon={icons.close}
					on:click={() => {
						deselectTool(t);
					}}
				/>
			{/if}
		{/each}
	</div>
	<button
		class="btn btn-w-fill"
		class:btn-big={!selectedTools.length}
		on:click={open}>Aggiungi uno strumento</button
	>

	<p class="mt"><strong>Per quante ore?</strong></p>
	<div class="number-input">
		<p>Inserisci il numero di ore</p>
		<input
			type="number"
			id="hours"
			name="hours"
			min="1"
			max="24"
			bind:value={day.hours}
		/>
	</div>
</div>

<!--  -->

<Modal title="Seleziona uno strumento">
	<div class="space-between">
		{#each tools as t (t.id)}
			<CardToolSelect
				id={t.id}
				name={t.attributes.name}
				selected={selectedTools.includes(t.id)}
				on:selection={handleSelection}
			/>
		{/each}
	</div>
</Modal>

<!--  -->
<style>
	.container {
		padding: var(--s-2);
		border: 1px solid gray;
	}

	.header {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	hr {
		margin-bottom: var(--s-2);
		margin-top: var(--s-1);
	}

	.tools-selected {
		margin: var(--s-2) 0;
	}

	.mt {
		margin-top: var(--s-3);
	}

	.number-input {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		margin-top: var(--s-1);
	}

	input {
		flex-grow: 1;
		margin-left: var(--s-2);
	}
</style>
