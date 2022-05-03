<script lang="ts">
	import { req } from '$lib/requestUtils';
	import type { endpoints as e, types as t } from 'shared';

	import { nanoid } from 'nanoid';

	import { Button, CardToolDay } from '$lib/components';
	import { goto } from '$app/navigation';

	//

	let tools: Array<t.ToolEntity> = [];
	let days: Array<t.ID<e.BookToolsCheckAvailabilityDay>> = [];

	const promise = (async () => {
		const res = await req.getTools();
		tools = [...res.data];
	})();

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

{#await promise}
	loading
{:then res}
	<div class="space-between">
		{#each days as day, i (day.id)}
			<CardToolDay
				{tools}
				{day}
				index={i + 1}
				on:click={() => {
					deleteDay(day.id);
				}}
			/>
		{/each}

		<button class="btn btn-w-fill" on:click={addDay}>Aggiungi uno giorno</button
		>

		<Button hierarchy="Primary" on:click={next}>Avanti</Button>
	</div>
{/await}
