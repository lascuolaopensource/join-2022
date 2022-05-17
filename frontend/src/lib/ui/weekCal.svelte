<script lang="ts">
	export let start = new Date();
	export let hours = 24;
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

	// Listing the hours
	let hoursList: Array<number> = [];
	for (let i = 0; i < hours; i++) {
		hoursList.push(i);
	}

	/**
	 * Helper functions
	 */

	// Hour formatter
	function formatHour(h: number) {
		return h.toLocaleString('it-IT', {
			minimumIntegerDigits: 2,
			useGrouping: false
		});
	}

	// Datetime builder
	function buildDateTime(d: Date, h: number) {
		const date = new Date(d.getTime());
		date.setHours(h);
		return date;
	}
</script>

<!--  -->

<div class="miniCal" style:--cols={days + 1} style:--rows={hours + 1}>
	<!-- First empty cell -->
	<div class="miniCal__header" />

	<!-- Hours column -->
	{#each hoursList as h}
		<div class="miniCal__hour">{formatHour(h)}:00</div>
	{/each}

	<!-- Days columns -->
	{#each daysList as d}
		<!-- Day header -->
		<div class="miniCal__header">
			{d.getDate()}
		</div>
		<!-- Hours per day -->
		{#each hoursList as h}
			{@const dateTime = buildDateTime(d, h)}
			<div class="miniCal__cell">
				<slot {dateTime} />
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
