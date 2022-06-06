<script lang="ts">
	import type { ToolCalendar } from './ToolCalendar';
	import ToolCalendarCellUI from './ToolCalendarCellUI.svelte';

	export let cal: ToolCalendar;

	$: console.log(cal.editsExist());
</script>

<!--  -->

<!-- <WeekCal start={dateStart} {hours} let:startDate let:endDate>
    <CalendarCell
        bind:content={calendars[t.id][startDate.toISOString()]}
    />
</WeekCal> -->
{#each cal.cells as cell}
	<ToolCalendarCellUI bind:cell />
{/each}
