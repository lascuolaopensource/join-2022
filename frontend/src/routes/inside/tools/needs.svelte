<script lang="ts">
	import type { endpoints as e, types as t } from 'shared';
	import { tools } from '$lib/stores';

	import { nanoid } from 'nanoid';

	import { Button, CardToolDay } from '$lib/components';
	import { goto } from '$app/navigation';

	//

	let days: Array<t.ID<e.BookToolsCheckAvailabilityDay>> = [];

	function getDayIndexByID(id: string) {
		for (let d of days) {
			if (d.id == id) return days.indexOf(d);
		}
	}

	function addDay() {
		days = [
			...days,
			{
				id: nanoid(5),
				tool_ids: [],
				hours: 1
			}
		];
	}

	function deleteDay(id: string) {
		const i = getDayIndexByID(id);
		days.splice(i, 1);
		days = days;
	}

	// Adding first day as default
	addDay();

	//

	async function next() {
		const query = encodeURIComponent(JSON.stringify(days));
		await goto(`/inside/tools/slots-${query}`);
	}
</script>

<!--  -->

<div class="space-between">
	{#each days as day, i (day.id)}
		<CardToolDay
			tools={$tools}
			{day}
			index={i + 1}
			on:click={() => {
				deleteDay(day.id);
			}}
		/>
	{/each}

	<button class="btn btn-w-fill" on:click={addDay}>Aggiungi uno giorno</button>

	<Button hierarchy="Primary" on:click={next}>Avanti</Button>
</div>
