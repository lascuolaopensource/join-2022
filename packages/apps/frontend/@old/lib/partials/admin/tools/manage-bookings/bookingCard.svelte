<script lang="ts">
	import type { types as t } from 'shared';
	import { formatters as f } from 'shared';
	import _ from 'lodash';

	import { IconButton, Hr } from '$lib/components';
	import { icons } from '$lib/icons';

	export let booking: t.ToolsBookingEntity;
	export let button = true;

	const book = booking.attributes;
	const owner = book?.owner?.data?.attributes;
	const ownerInfo = owner?.userInfo?.data?.attributes;
	const slots = book?.slots?.data;

	type SlotGroup = {
		start: Date;
		end: Date;
		tools: Array<t.Tool>;
	};

	const days: Array<SlotGroup> = [];

	if (slots) {
		const groups = _.groupBy(slots, (s) => [
			s.attributes?.start,
			s.attributes?.end
		]);

		for (let [dates, slots] of Object.entries(groups)) {
			const datesStr = dates.split(',');
			const start = new Date(datesStr[0]);
			const end = new Date(datesStr[1]);
			const tools: Array<t.Tool> = [];
			slots.forEach((s) => {
				const tool = s.attributes?.tool?.data?.attributes;
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
	{#if book && owner && slots && ownerInfo}
		<!-- Info -->
		<div class="grow mr-4 space-y-4">
			<!-- Owner -->
			<div>
				<p><strong>Utente</strong></p>
				<p>{ownerInfo.name} {ownerInfo.surname}</p>
				<p>{owner.email}</p>
			</div>

			<Hr mode="light" />

			<!-- Slots -->
			{#each days as d}
				{@const start = f.formatDateString(d.start.toISOString())}
				{@const end = f.formatDateString(d.end.toISOString())}
				<div>
					<!-- Days -->
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
				<!-- {s.attributes?.start}
				{s.attributes?.end} -->
			{/each}
		</div>

		<!-- Button -->
		{#if button}
			<div class="shrink-0">
				<IconButton icon={icons.trash} on:click />
			</div>
		{/if}
	{/if}
</div>
