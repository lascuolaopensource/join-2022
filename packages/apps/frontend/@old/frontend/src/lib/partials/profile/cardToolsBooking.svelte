<script lang="ts">
	import { formatters as f } from 'shared';
	import type { types as t } from 'shared';
	import _ from 'lodash';

	export let toolsBooking: t.ToolsBooking;

	// Extracting variables
	const slots = toolsBooking.slots as any as Array<t.ToolSlot>;

	/**
	 * Grouping slots
	 */

	type SlotGroup = {
		start: Date;
		end: Date;
		tools: Array<t.Tool>;
	};

	const days: Array<SlotGroup> = [];

	if (slots) {
		const groups = _.groupBy(slots, (s) => [s.start, s.end]);

		for (let [dates, slots] of Object.entries(groups)) {
			const datesStr = dates.split(',');
			const start = new Date(datesStr[0]);
			const end = new Date(datesStr[1]);
			const tools: Array<t.Tool> = [];
			slots.forEach((s) => {
				const tool = s.tool as t.ID<t.Tool>;
				if (tool) tools.push(tool);
			});
			days.push({ start, end, tools });
		}
	}
</script>

<!--  -->

<div
	class="
        p-4 border-1 border-gray-300
        flex flex-row flex-nowrap items-start justify-between
    "
>
	{#if slots}
		<!-- Info -->
		<div class="grow mr-4 space-y-4">
			<!-- Days -->
			{#each days as d}
				{@const start = f.formatDateString(d.start.toISOString())}
				{@const end = f.formatDateString(d.end.toISOString())}
				<div>
					<!-- Time range -->
					<p>
						<strong>
							{start} &#8594; {end}
						</strong>
					</p>
					<!-- Tools -->
					<ul class="list-disc list-inside">
						{#each d.tools as tool}
							<li>{tool.name}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}
</div>
