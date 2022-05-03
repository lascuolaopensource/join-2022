<script lang="ts">
	export let start: Date;
	export let hours = 24;
	export let days = 7;

	const total = hours * days;

	const daysList: Array<Date> = [];
	for (let i = 0; i < days; i++) {
		// Create new date instance
		const newDate = new Date();
		// Add a day
		newDate.setDate(start.getDate() + i);
		//
		daysList.push(newDate);
	}

	const hoursList: Array<string> = [];
	for (let i = 0; i < hours; i++) {
		hoursList.push(
			i.toLocaleString('it-IT', {
				minimumIntegerDigits: 2,
				useGrouping: false
			})
		);
	}
</script>

<!--  -->

{start}
<div class="miniCal" style:--cols={days + 1} style:--rows={hours + 1}>
	<!-- Header -->
	<div class="miniCal__header" />
	{#each daysList as d}
		<div class="miniCal__header">
			{d.getDate()}
		</div>
	{/each}
	<!-- Rows -->
	{#each hoursList as h}
		<div class="miniCal__hour">{h}</div>
		{#each { length: days } as _, d}
			<div class="miniCal__cell">yolo</div>
		{/each}
	{/each}
</div>

<!--  -->
<style>
	.miniCal {
		display: grid;
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
