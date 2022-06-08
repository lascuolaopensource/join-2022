<script lang="ts">
	import { helpers as h, endpoints as e, types as t, types } from 'shared';
	import { tools } from '$lib/stores';
	import { req } from '$lib/requestUtils';
	import _ from 'lodash';

	import { ToolCalendar } from '$lib/partials/admin/tools/manageAvailability/ToolCalendar';
	import ToolCalendarUI from '$lib/partials/admin/tools/manageAvailability/ToolCalendarUI.svelte';
	import BatchEdit from '$lib/partials/admin/tools/manageAvailability/BatchEdit.svelte';
	import type { EventDetail } from '$lib/partials/admin/tools/manageAvailability/BatchEdit.svelte';

	import { BottomBar, Button, Modal } from '$lib/components';
	import { close, open } from '$lib/components/modal.svelte';

	/**
	 * Basic variables
	 */

	const days = 7;
	const step = 60 * 60 * 1000;

	let promise: Promise<void>;
	// Global promise used to display loading

	/**
	 * Date range calculation
	 */

	//  Start date
	let dateStart: Date = h.date.getPreviousMonday(new Date());
	dateStart.setHours(0, 0, 0, 0); // Setting date to zero hour

	// End date
	let dateEnd: Date = h.date.addDays(dateStart, days);

	// List of all the dates
	let dates: Array<Date> = calcAllDates();

	function calcAllDates(): Array<Date> {
		const dates: Array<Date> = [];
		for (let d = 0; d < days; d++) {
			dates.push(h.date.addDays(dateStart, d));
		}
		return dates;
	}

	// List all the times (in ms)
	let times: Array<number> = h.date.splitDayInSlots(step);

	/**
	 * Creating calendars
	 */

	let calendars: Array<ToolCalendar> = createEmptyCalendars();

	function createEmptyCalendars(): Array<ToolCalendar> {
		return $tools.map((t) => new ToolCalendar(t.id as string, dates, step));
	}

	/**
	 * Fetching data to fill calendars
	 */

	promise = fetchSlots();

	async function fetchSlots(): Promise<void> {
		// Fetching slots
		const slots = await req.getToolSlotsLoop(dateStart, dateEnd);

		// Grouping slots by tool ID
		const groups = _.groupBy(slots, (s) => s.attributes?.tool?.data?.id);

		// Storing results in calendars
		for (let toolID of Object.keys(groups)) {
			// Getting calendar
			const toolCal = _.find(calendars, { toolID });
			// Iterating over found slots
			toolCal?.addSlots(groups[toolID]);
		}

		// Updating
		calendars = calendars;
	}

	/**
	 * Edits management
	 */

	// Edits detection
	let editsExist = false;
	$: editsExist = calendars.some((c) => c.editsExist());

	function getEdits(): e.AdminToolsUpdateSlotsReq {
		const edits: Record<string, Array<t.ToolSlotInput>> = {};
		calendars.forEach((c) => {
			if (c.editsExist()) {
				edits[c.toolID] = c.getEdits();
			}
		});
		return edits;
	}

	function saveEdits() {
		const changes = getEdits();
		promise = req.updateSlots(changes).then((v) => {
			// Resetting data
			calendars = createEmptyCalendars();
			promise = fetchSlots();
		});
	}

	function undoEdits(): void {
		calendars.forEach((cal) => {
			cal.resetEdits();
		});
		calendars = calendars;
	}

	/**
	 * Week change
	 */

	function changeWeek(amount: number) {
		if (!editsExist) {
			// Changing dates
			dateStart = h.date.addDays(dateStart, days * amount);
			dateEnd = h.date.addDays(dateStart, days);
			// Updating data
			dates = calcAllDates();
			calendars = createEmptyCalendars();
			promise = fetchSlots();
		} else {
			// Display tooltip "unable to change, save or discard changes first"
		}
	}

	function nextWeek(): void {
		changeWeek(1);
	}

	function previousWeek(): void {
		changeWeek(-1);
	}

	/**
	 * Multiple block
	 */

	function batchEdit(e: any) {
		const detail: EventDetail = e.detail;

		// Iterating over selected tools
		for (let t of detail.tools) {
			const cal = _.find(calendars, { toolID: t.id?.toString() });

			// Iterating over dates and times
			for (let d of detail.dates) {
				for (let t of detail.times) {
					// Building datetime string
					const datetime = h.date.addTime(d, t);
					const datetimeID = datetime.toISOString();

					// Selecting cell and editing content
					const cell = cal?.cells[datetimeID];
					if (cell?.type === null) {
						cell.type = types.Enum_Toolslot_Type.Availability;
						cell.edited = true;
					}
				}
			}
		}

		// Updating calendars
		calendars = calendars;
		// Closing modal
		close();
	}
</script>

<!--  -->

{#await promise}
	loading
{:then res}
	<!-- Main container -->
	<div class="flex flex-row flex-nowrap gap-6">
		<!-- Sidebar -->
		<div class="grow basis-60 shrink-0">
			<div class="sticky top-16 flex flex-col flex-nowrap gap-4">
				<div>
					<button
						class="bg-slate-200 hover:bg-slate-300 w-10 h-10"
						on:click={previousWeek}>-</button
					>
					<button
						class="bg-slate-200 hover:bg-slate-300 w-10 h-10"
						on:click={nextWeek}>+</button
					>
				</div>
				{dateStart}

				<button class="btn btn-secondary" on:click={open}
					>Modifica multipla</button
				>
			</div>
		</div>

		<!-- Calendars -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each calendars as cal}
				{@const tool = _.find($tools, { id: cal.toolID })}
				<div class="self-stretch flex flex-col flex-nowrap justify-between">
					<p><strong>{tool?.attributes?.name}</strong></p>
					<ToolCalendarUI bind:cal />
				</div>
			{/each}
		</div>
	</div>

	<!-- Bottom bar -->
	{#if editsExist}
		<BottomBar spaceBetween={true}>
			<p class="text-base">Ci sono modifiche</p>
			<div>
				<Button hierarchy="Secondary" on:click={undoEdits}>Annulla</Button>
				<Button on:click={saveEdits}>Salva</Button>
			</div>
		</BottomBar>
	{/if}

	<!-- Multiple block modal -->
	<Modal title="Modifica multipla">
		<BatchEdit {dates} {times} on:updateSlots={batchEdit} />
	</Modal>
{/await}
