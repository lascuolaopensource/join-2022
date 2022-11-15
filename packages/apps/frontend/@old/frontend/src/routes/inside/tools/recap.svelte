<script lang="ts">
	import { toolNeeds, toolDates, tools } from '$lib/stores';
	import { req } from '$lib/requestUtils';
	import { goto } from '$app/navigation';
	import type { endpoints as e } from 'shared';
	import _ from 'lodash';

	import { Button, BottomBar } from '$lib/components';
	import ToolsSteps from '$lib/partials/tools/toolsSteps.svelte';

	//

	const valid = $toolNeeds.length > 0 && $toolNeeds.length == $toolDates.length;

	const days: Array<e.DayReq> = [];
	if (valid) {
		for (let i = 0; i < $toolNeeds.length; i++) {
			const tool_ids = $toolNeeds[i].tools;
			const start = $toolDates[i][0];
			const end = $toolDates[i][1];
			days.push({
				tool_ids,
				start,
				end
			});
		}
	}

	async function bookTools() {
		await req.bookTools({
			days
		});
		await goto('/inside/tools/confirm');
	}
</script>

<!--  -->

<div class="container mx-auto p-6">
	<div class="mb-6">
		<ToolsSteps />
	</div>
	{#if days.length}
		{#each days as d}
			{@const start = new Date(d.start)}
			{@const end = new Date(d.end)}
			<div class="p-4 border-2 mb-2">
				<!--  -->
				<div>
					<h3 class="text-lg font-bold">Data</h3>
					<p>
						{start.toLocaleDateString('IT-it')}
					</p>
				</div>
				<!--  -->
				<div>
					<h3 class="text-lg font-bold">Ore</h3>
					<p>
						{start.getHours()} → {end.getHours()}
					</p>
				</div>
				<!--  -->
				<div>
					<h3 class="text-lg font-bold">Strumenti</h3>
					{#each d.tool_ids as t}
						{@const toolID = parseInt(t) - 1}
						{@const tool = $tools[toolID]}
						{#if tool}
							{#if tool.attributes}
								<p>{tool.attributes.name}</p>
							{/if}
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	{/if}
</div>

<BottomBar background="default">
	<div class="flex flex-row flex-nowrap justify-end">
		<Button hierarchy="primary" disabled={!valid} on:click={bookTools}
			>Prenota!</Button
		>
	</div>
</BottomBar>
