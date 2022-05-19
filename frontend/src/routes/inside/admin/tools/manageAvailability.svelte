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

	function createEmptyCalendar(): Calendar {
		const cal: Calendar = {};
		for (let d = 0; d < days; d++) {
			const date = h.date.addDays(dateStart, d);
			for (let h = 0; h < hours; h++) {
				date.setHours(h, 0, 0, 0);
				cal[date.toISOString()] = { state: null, edited: false };
			}
		}
		return cal;
	}

	function createEmptyCalendars(): Calendars {
		const calendars: Calendars = {};
		$tools.forEach((t) => {
			calendars[t.id] = createEmptyCalendar();
		});
		return calendars;
	}

	/**
	 * Fetching data to fill calendars
	 */

	promise = fetchSlots();

	async function fetchSlots(): Promise<void> {
		const slots: Array<t.ToolSlotEntity> = [];

		// Fetching the first batch of the slots
		const res = await req.getToolsSlots(
			dateStart.toISOString(),
			dateEnd.toISOString(),
			1,
			100
		);
		// Saving
		slots.push(...res.data);

		// Fetching the other pages
		for (let i = 0; i < res.meta.pagination.pageCount - 1; i++) {
			const res = await req.getToolsSlots(
				dateStart.toISOString(),
				dateEnd.toISOString(),
				2 + i,
				100
			);
			slots.push(...res.data);
		}

		// Grouping slots by tool ID
		const groups = _.groupBy(slots, (s) => s.attributes.tool.data.id);

		// Storing results in calendar
		for (let toolID of Object.keys(groups)) {
			for (let s of groups[toolID]) {
				// Calculating slot length
				const lengthMS =
					Date.parse(s.attributes.end) - Date.parse(s.attributes.start);
				const lengthH = lengthMS / 1000 / 60 / 60;
				for (let i = 0; i < lengthH; i++) {
					const date = h.date.addHours(new Date(s.attributes.start), i);
					const dateID = date.toISOString();
					calendars[toolID][dateID] = {
						state: s.attributes.type,
						edited: false
					};
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
		const changes: Array<e.SlotUpdate> = [];
		for (let toolID in calendars) {
			for (let dateID in calendars[toolID]) {
				const slot = calendars[toolID][dateID];
				if (slot.edited)
					changes.push({
						toolID,
						dateTime: dateID,
						state: slot.state
					});
			}
		}
		return changes;
	}

	function saveChanges() {
		const changes = getChanges();
		promise = req.updateSlots({ changes }).then((v) => {
			// Resetting data
			// calendars = createEmptyCalendars();
			// promise = fetchSlots();
		});
	}

	function undoChanges() {
		const changes = getChanges();
		for (let c of changes) {
			const slot = calendars[c.toolID][c.dateTime];
			slot.edited = false;
			slot.state =
				slot.state === null ? t.Enum_Toolslot_Type.Availability : null;
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
					calendars[toolID][datetime.toISOString()] = {
						state: t.Enum_Toolslot_Type.Availability,
						edited: true
					};
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
					<WeekCal start={dateStart} {hours} let:dateTime>
						<CalendarCell
							bind:content={calendars[t.id][dateTime.toISOString()]}
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
