<script lang="ts">
	import { toolNeeds } from '$lib/stores';
	import type { endpoints as e, types as t } from 'shared';
	import _ from 'lodash';
	import { goto } from '$app/navigation';

	import { Button, BottomBar, Container } from '$lib/components';
	import DayCard from '$lib/partials/tools/needs/dayCard.svelte';

	//

	function addDay() {
		const newDay: e.ToolNeedsDay = {
			id: $toolNeeds.length,
			tools: [],
			hours: 1
		};
		$toolNeeds = [...$toolNeeds, newDay];
	}

	function deleteDay(id: number) {
		const day = _.find($toolNeeds, { id });
		if (day) {
			const index = $toolNeeds.indexOf(day);
			$toolNeeds.splice(index, 1);
			reorderDays();
			$toolNeeds = $toolNeeds;
		}
	}

	function reorderDays() {
		for (let [i, d] of Object.entries($toolNeeds)) {
			d.id = parseInt(i);
		}
	}

	// Adding first day as default
	if ($toolNeeds.length === 0) {
		addDay();
	}

	async function next() {
		await goto(`/inside/tools/availabilities`);
	}

	let ready = false;
	$: ready = $toolNeeds.every((d) => d.tools.length > 0 && d.hours > 0);
</script>

<!--  -->

<Container>
	<div>
		{#each $toolNeeds as day (day)}
			<div class="mb-4">
				<DayCard
					bind:day
					on:click={() => {
						deleteDay(day.id);
					}}
				/>
			</div>
		{/each}

		<Button hierarchy="secondary" fullWidth on:click={addDay}
			>+ Aggiungi un giorno</Button
		>
	</div>
</Container>

<BottomBar background="default">
	<div class="flex flex-row flex-nowrap justify-end">
		<Button hierarchy="primary" disabled={!ready} on:click={next}>Avanti</Button
		>
	</div>
</BottomBar>
