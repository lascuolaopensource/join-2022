<script lang="ts">
	import { tools } from '$lib/stores';
	import { helpers as h, endpoints as e, types as t } from 'shared';
	import { req } from '$lib/requestUtils';
	import _ from 'lodash';

	import { WeekCal } from '$lib/ui';

	import BlockMultiple from '$lib/partials/admin/tools/block/multiple.svelte';
	import type { EventDetail } from '$lib/partials/admin/tools/block/multiple.svelte';
	import CalendarCell from '$lib/partials/admin/tools/block/calendarCell.svelte';
	import type { CellContent } from '$lib/partials/admin/tools/block/calendarCell.svelte';

	import { BottomBar, Button, Modal } from '$lib/components';
	import { close, open } from '$lib/components/modal.svelte';

	/**
	 * Basic variables
	 */

	const days = 7;
	const hours = 24;

	let promise: Promise<void>;
	// Global promise used to display loading

	/**
	 * Date range calculation
	 */

	let dateStart: Date = h.date.getPreviousMonday(new Date());
	dateStart.setHours(0, 0, 0, 0); // Setting date to zero hour

	let dateEnd: Date = h.date.addDays(dateStart, days);

	/**
	 * Creating calendars
	 */

	type Calendar = Record<string, CellContent>;
	// Record<date.toISOString(), CellContent>
	type Calendars = Record<string, Calendar>;
	// Record<toolID, Calendar>

	let calendars: Calendars = createEmptyCalendars();

	function createEmptyCalendar(toolID: string): Calendar {
		const cal: Calendar = {};

		for (let d = 0; d < days; d++) {
			const date = h.date.addDays(dateStart, d);
			date.setHours(0, 0, 0, 0);

			for (let hour = 0; hour < hours; hour++) {
				const start = h.date.addHours(date, hour);
				const end = h.date.addHours(date, hour + 1);

				cal[start.toISOString()] = {
					start,
					end,
					tool: toolID,
					type: null,
					edited: false
				};
			}
		}

		return cal;
	}

	function createEmptyCalendars(): Calendars {
		const calendars: Calendars = {};
		$tools.forEach((t) => {
			calendars[t.id] = createEmptyCalendar(t.id);
		});
		return calendars;
	}

	/**
	 * Fetching data to fill calendars
	 */

	promise = fetchSlots();

	async function fetchSlots(): Promise<void> {
		// Fetching slots
		const slots: Array<t.ToolSlotEntity> = await req.getToolSlotsLoop(
			dateStart,
			dateEnd
		);

		// Grouping slots by tool ID
		const groups = _.groupBy(slots, (s) => s.attributes.tool.data.id);

		// Storing results in calendar
		for (let toolID of Object.keys(groups)) {
			for (let s of groups[toolID]) {
				// Transforming slots longer than 1 hour

				// Calculating slot length
				const lengthMS =
					Date.parse(s.attributes.end) - Date.parse(s.attributes.start);
				const lengthH = lengthMS / 1000 / 60 / 60;

				// Updating calendar slots
				for (let i = 0; i < lengthH; i++) {
					const date = h.date.addHours(new Date(s.attributes.start), i);
					const dateID = date.toISOString();
					calendars[toolID][dateID].type = s.attributes.type;
					calendars[toolID][dateID].edited = false;
				}
			}
		}
	}

	/**
	 * Edits detection
	 */

	let editsExist = false;

	$: {
		for (let cal of Object.values(calendars)) {
			if (Object.values(cal).some((slot) => slot.edited)) {
				editsExist = true;
				break;
			}
			editsExist = false;
		}
	}

	/**
	 * Edits management
	 */

	function getChanges() {
		const changes: Record<string, Array<CellContent>> = {};

		for (let toolID in calendars) {
			changes[toolID] = [];

			for (let dateID in calendars[toolID]) {
				const slot = calendars[toolID][dateID];
				if (slot.edited) changes[toolID].push(slot);
			}

			if (changes[toolID].length === 0) {
				delete changes[toolID];
			}
		}
		return changes;
	}

	function saveChanges() {
		const changes = getChanges();
		console.log(changes);
		// promise = req.updateSlots({ changes }).then((v) => {
		// 	// Resetting data
		// 	// calendars = createEmptyCalendars();
		// 	// promise = fetchSlots();
		// });
	}

	function undoChanges() {
		const changes = getChanges();
		for (let [toolID, toolChanges] of Object.entries(changes)) {
			for (let c of toolChanges) {
				const slot = calendars[toolID][c.start.toISOString()];
				slot.edited = false;
				slot.type =
					slot.type === null ? t.Enum_Toolslot_Type.Availability : null;
			}
		}
		calendars = calendars;
	}

	/**
	 * Week change
	 */

	function changeWeek(sign: -1 | 1) {
		if (!editsExist) {
			// Changing dates
			dateStart = h.date.addDays(dateStart, days * sign);
			dateEnd = h.date.addDays(dateStart, days);
			// Updating data
			calendars = createEmptyCalendars();
			promise = fetchSlots();
		}
	}

	/**
	 * Multiple block
	 */

	const daysList = calcAllDates();

	function calcAllDates(): Array<Date> {
		const dates: Array<Date> = [];
		for (let d = 0; d < days; d++) {
			dates.push(h.date.addDays(dateStart, d));
		}
		return dates;
	}

	function multipleChange(detail: EventDetail) {
		console.log(detail);
		detail.tools.forEach((toolID) => {
			detail.days.forEach((d) => {
				detail.hours.forEach((h) => {
					const datetime = new Date(Date.parse(d));
					datetime.setHours(parseInt(h), 0, 0, 0);
					const dateID = datetime.toISOString();
					calendars[toolID][dateID].type = t.Enum_Toolslot_Type.Availability;
					calendars[toolID][dateID].edited = true;
				});
			});
		});
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
						on:click={() => {
							changeWeek(-1);
						}}>-</button
					>
					<button
						class="bg-slate-200 hover:bg-slate-300 w-10 h-10"
						on:click={() => {
							changeWeek(1);
						}}>+</button
					>
				</div>
				{dateStart}

				<button class="btn btn-secondary" on:click={open}
					>Blocco multiplo</button
				>
			</div>
		</div>

		<!-- Calendars -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each $tools as t}
				<div>
					<p><strong>{t.attributes.name}</strong></p>
					<WeekCal start={dateStart} {hours} let:startDate let:endDate>
						<CalendarCell
							bind:content={calendars[t.id][startDate.toISOString()]}
						/>
					</WeekCal>
				</div>
			{/each}
		</div>
	</div>

	<!-- Bottom bar -->
	{#if editsExist}
		<BottomBar spaceBetween={true}>
			<p class="text-base">Ci sono modifiche</p>
			<div>
				<Button hierarchy="Secondary" on:click={undoChanges}>Annulla</Button>
				<Button on:click={saveChanges}>Salva</Button>
			</div>
		</BottomBar>
	{/if}

	<!-- Multiple block modal -->
	<Modal title="Blocco multiplo">
		<BlockMultiple
			days={daysList}
			{hours}
			on:updateSlots={(e) => {
				multipleChange(e.detail);
				close();
			}}
		/>
	</Modal>
{/await}
