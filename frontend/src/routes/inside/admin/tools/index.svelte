<script lang="ts">
	import { tools } from '$lib/stores';
	import { MiniCal, MiniCalCell } from '$lib/components';
	import { miniCalCellStates } from '$lib/components/miniCalCell.svelte';
	import type {
		MiniCalCellState,
		EventDetail
	} from '$lib/components/miniCalCell.svelte';
	import _ from 'lodash';

	//

	const days = 7;
	const hours = 24;

	let weekStart = getMonday();

	function getMonday() {
		const d = new Date();
		d.setHours(0, 0, 0, 0);

		const day = d.getDay();
		const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		return new Date(d.setDate(diff));
	}

	const cals = {};

	$tools.forEach((t) => {
		cals[t.id] = {};

		// Iterating over days
		for (let d = 0; d < days; d++) {
			// Creating the date
			const date = new Date(weekStart.getTime());
			date.setDate(weekStart.getDate() + d);

			// Randomly generating states
			for (let i = 0; i < hours; i++) {
				date.setHours(i, 0, 0, 0);
				cals[t.id][date.toISOString()] = _.sample(miniCalCellStates);
			}
		}
	});

	//

	let edits: Record<string, Record<string, MiniCalCellState>> = {};
	createEmptyEdits();

	function createEmptyEdits() {
		edits = {};
		$tools.forEach((t) => {
			edits[t.id] = {};
		});
	}

	function updateEdits(e: CustomEvent<EventDetail>, toolID: string) {
		//
		const { dateTime, edited, state } = e.detail;
		const id = dateTime.toISOString();
		//
		if (!(id in edits[toolID]) && edited) {
			edits[toolID][id] = state == 'blocked' ? 'free' : 'blocked';
		}
		if (id in edits[toolID] && !edited) {
			delete edits[toolID][id];
		}
		// Reassigning object to trigger change
		edits[toolID] = { ...edits[toolID] };
	}

	function editsExist() {
		for (const toolEdits of Object.values(edits)) {
			if (Object.values(toolEdits).length > 0) {
				return true;
			}
		}
		return false;
	}

	function changeWeek(sign: -1 | 1) {
		createEmptyEdits();
		// if (!editsExist()) {
		weekStart.setDate(weekStart.getDate() + 7 * sign);
		weekStart = weekStart;
		// }
	}
</script>

<!--  -->

<main>
	<div class="sidebar">
		<button
			on:click={() => {
				changeWeek(-1);
			}}>-</button
		>
		<button
			on:click={() => {
				changeWeek(1);
			}}>+</button
		>
		{weekStart}
	</div>

	<div class="cals__container">
		{#each $tools as t}
			<div class="cal__container">
				<p><strong>{t.attributes.name}</strong></p>
				<MiniCal start={weekStart} {hours} let:dateTime>
					<MiniCalCell
						{dateTime}
						bind:state={cals[t.id][dateTime.toISOString()]}
						on:edit={(e) => {
							updateEdits(e, t.id);
						}}
					/>
				</MiniCal>
			</div>
			<pre>{JSON.stringify(edits[t.id], null, 2)}</pre>
		{/each}
	</div>
</main>

<!--  -->
<style>
	button {
		width: 40px;
		height: 40px;
	}

	main {
		display: flex;
		flex-flow: row nowrap;
	}

	.sidebar {
		flex-basis: 40%;
	}

	.cals__container {
		display: flex;
		flex-flow: row wrap;
		gap: var(--s-2);
	}

	.cal__container {
		flex-basis: 30%;
	}
</style>
