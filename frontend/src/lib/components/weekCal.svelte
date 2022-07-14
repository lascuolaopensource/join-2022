<script lang="ts">
	import { helpers as h } from 'shared';

	export let start = new Date();
	export let step = 60 * 60 * 1000;
	export let days = 7;

	/**
	 * Calendar setup
	 */

	// Setting the start date time to zero
	start.setHours(0, 0, 0, 0);

	// Listing the days
	let daysList: Array<Date> = [];
	for (let i = 0; i < days; i++) {
		// Create new date instance
		const newDate = new Date(start.getTime());
		// Add a day
		newDate.setDate(start.getDate() + i);
		//
		daysList.push(newDate);
	}

	// Listing the steps
	let stepList: Array<number> = h.date.splitDayInSlots(step);

	// Datetime builder
	function buildDateTime(d: Date, ms: number) {
		const date = new Date(d.getTime() + ms);
		return date;
	}
</script>

<!--  -->

<div class="miniCal" style:--cols={days + 1} style:--rows={stepList.length + 1}>
	<!-- First empty cell -->
	<div class="miniCal__header" />

	<!-- Hours column -->
	{#each stepList as s}
		<div class="miniCal__hour">{h.date.msToHHMM(s)}</div>
	{/each}

	<!-- Days columns -->
	{#each daysList as d}
		<!-- Day header -->
		<div class="miniCal__header">
			{d.getDate()}
		</div>
		<!-- Steps per day -->
		{#each stepList as s}
			{@const startDate = buildDateTime(d, s)}
			{@const endDate = buildDateTime(d, s + step)}
			<div class="miniCal__cell">
				<slot {startDate} {endDate} />
			</div>
		{/each}
	{/each}
</div>

<!--  -->
<style>
	.miniCal {
		display: grid;
		grid-auto-flow: column;
		grid-template-rows: repeat(var(--rows), 1fr);
		grid-template-columns: repeat(var(--cols), 1fr);
	}

	.miniCal__cell {
		border: 1px solid black;
	}

	.miniCal__hour {
		border: 1px solid blue;
	}

	.miniCal__header {
		border: 1px solid red;
	}
</style>
