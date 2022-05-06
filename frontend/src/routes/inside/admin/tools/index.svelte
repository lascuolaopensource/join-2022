<script lang="ts">
	import { tools } from '$lib/stores';
	import _ from 'lodash';
	import { req } from '$lib/requestUtils';
	import { helpers as h, endpoints as e } from 'shared';

	import { MiniCal, MiniCalCell, BottomBar, Button } from '$lib/components';
	import type { CellContent } from '$lib/components/miniCalCell.svelte';

	// Base variables

	const days = 7;
	const hours = 24;

	// Calculating date range

	let dateStart: Date = h.date.getPreviousMonday(new Date());
	let dateEnd: Date;

	$: {
		dateEnd = h.date.addDays(dateStart, days);
	}

	// Fetching slots for the week

	let promise: Promise<void>;
	let calendars: Record<string, Record<string, CellContent>>;
	// Record<toolID, Record<date.toISOString(), CellContent>>

	$: {
		dateStart; // when dateStart changes
		setEmptyCalendars();
		promise = fetchSlots();
	}

	function createEmptyCalendar() {
		const cal: Record<string, CellContent> = {};
		for (let d = 0; d < days; d++) {
			const date = h.date.addDays(dateStart, d);
			for (let h = 0; h < hours; h++) {
				date.setHours(h, 0, 0, 0);
				cal[date.toISOString()] = { state: null, edited: false };
			}
		}
		return cal;
	}

	function setEmptyCalendars(): void {
		calendars = {};
		$tools.forEach((t) => {
			calendars[t.id] = createEmptyCalendar();
		});
	}

	async function fetchSlots(): Promise<void> {
		// Fetching all the slots
		const res = await req.getToolsSlots(
			h.date.formatQueryDate(dateStart),
			h.date.formatQueryDate(dateEnd)
		);

		// Grouping slots by tool ID
		const groups = _.groupBy(res.data, (s) => s.attributes.tool.data.id);

		// Storing results in calendar
		for (let toolID of Object.keys(groups)) {
			for (let s of groups[toolID]) {
				const dateID = h.date
					.joinDateHour(s.attributes.date, s.attributes.time_start)
					.toISOString();
				calendars[toolID][dateID] = { state: s.attributes.type, edited: false };
			}
		}
	}

	// Edits detection

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

	// Week change

	function changeWeek(sign: -1 | 1) {
		if (!editsExist) {
			dateStart.setDate(dateStart.getDate() + 7 * sign);
			dateStart = dateStart;
		}
	}

	// Saving changes

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

	async function saveChanges() {
		const changes = getChanges();
		console.log(changes);
		await req.updateSlots({ changes });
	}
</script>

<!--  -->

{#await promise}
	loading
{:then res}
	<div class="flex flex-row flex-nowrap gap-6">
		<div class="grow basis-56 shrink-0">
			<div class="sticky top-16">
				<button
					class="bg-slate-200 hover:bg-slate-300"
					on:click={() => {
						changeWeek(-1);
					}}>-</button
				>
				<button
					class="bg-slate-200 hover:bg-slate-300"
					on:click={() => {
						changeWeek(1);
					}}>+</button
				>
				{dateStart}
			</div>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{#each $tools as t}
				<div>
					<p><strong>{t.attributes.name}</strong></p>
					<MiniCal start={dateStart} {hours} let:dateTime>
						<MiniCalCell
							bind:content={calendars[t.id][dateTime.toISOString()]}
						/>
					</MiniCal>
				</div>
			{/each}
		</div>
	</div>

	{#if editsExist}
		<BottomBar spaceBetween={true}>
			<p class="text-base">Ci sono modifiche</p>
			<Button on:click={saveChanges}>Salva</Button>
		</BottomBar>
	{/if}
{/await}

<!--  -->
<style>
	button {
		width: 40px;
		height: 40px;
	}
</style>
