<script lang="ts">
	import { toolDayRequest, toolDaysRequest, tools } from '$lib/stores';
	import { req } from '$lib/requestUtils';
	import { goto } from '$app/navigation';
	import type { endpoints as e } from 'shared';
	console.log($toolDayRequest);
	console.log($toolDaysRequest);

	const days: Array<e.DayReq> = [];
	if ($toolDayRequest) {
		days.push($toolDayRequest);
	} else if ($toolDaysRequest.length) {
		days.push(...$toolDaysRequest);
	}

	async function bookTools() {
		await req.bookTools({
			days
		});
		await goto('/inside/tools/confirm');
	}
</script>

<!--  -->

{#if days.length}
	{#each days as d}
		<div class="p-4 border-2 mb-2">
			<div>
				<h3 class="text-lg font-bold">Data</h3>
				<p>
					{d.start.toLocaleDateString('IT-it')}
				</p>
			</div>
			<div>
				<h3 class="text-lg font-bold">Ore</h3>
				<p>
					{d.start.getHours()} → {d.end.getHours()}
				</p>
			</div>
			<div>
				<h3 class="text-lg font-bold">Strumenti</h3>
				{#each d.tool_ids as t}
					<p>
						{$tools[parseInt(t)].attributes.name}
					</p>
				{/each}
			</div>
		</div>
	{/each}

	<button class="btn btn-primary" on:click={bookTools}>Prenota!</button>
{/if}
