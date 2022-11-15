<script lang="ts">
	import { goto } from '$app/navigation';
	import { toolNeeds, toolDates } from '$lib/stores';
	import { req } from '$lib/requestUtils';
	import _ from 'lodash';

	//

	const promise = setup();

	type OptionsGroup = {
		date: string;
		options: Array<[string, string]>;
	};

	async function setup(): Promise<Array<OptionsGroup>> {
		// Fetching data
		const res = await req.checkSlots({
			days: $toolNeeds,
			start: new Date().toISOString()
		});

		// Grouping data by day
		const groups: Array<OptionsGroup> = [];

		if (res.kind == 'single') {
			// Grouping by day
			const groupsDict = _.groupBy(res.data, (d) => {
				const date = new Date(d[0]);
				date.setHours(0, 0, 0, 0);
				return date.toISOString();
			});

			// Converting into array
			for (let [date, options] of Object.entries(groupsDict)) {
				groups.push({
					date,
					options
				});
			}

			// Sorting
			groups.sort((a, b) => {
				return Date.parse(a.date) - Date.parse(b.date);
			});
		}

		return groups;
	}

	//

	async function submit(option: [string, string]) {
		$toolDates = [option];
		await goto('/inside/tools/recap');
	}
</script>

<!--  -->

<div class="container mx-auto px-6">
	{#await promise then res}
		{#each res as group}
			{@const day = new Date(group.date)}
			<p class="font-bold mb-4">{day}</p>
			<div class="mb-8 space-y-2">
				{#each group.options as option}
					<div
						class="bg-slate-200 hover:bg-slate-300 p-4"
						on:click={() => {
							submit(option);
						}}
					>
						{new Date(option[0]).getHours()} →
						{new Date(option[1]).getHours()}
					</div>
				{/each}
			</div>
		{/each}
	{/await}
</div>
