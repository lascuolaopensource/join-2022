<script lang="ts">
	import type { ToolCalendar } from './ToolCalendar';
	import ToolCalendarCellUI from './ToolCalendarCellUI.svelte';
	import WeekCal from '$lib/ui/weekCal.svelte';

	export let cal: ToolCalendar;

	const start = cal.getStartDate();
	const step = cal.timeStep;
</script>

<!--  -->

<WeekCal {start} {step} let:startDate>
	<ToolCalendarCellUI bind:cell={cal.cells[startDate.toISOString()]} />
</WeekCal>
