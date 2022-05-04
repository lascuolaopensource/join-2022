<script lang="ts">
	import { tools } from '$lib/stores';
	import { MiniCal, MiniCalCell } from '$lib/components';
	import type {
		MiniCalCellState,
		EventDetail
	} from '$lib/components/miniCalCell.svelte';

	const start = new Date();
	const days = 7;

	const cal = (() => {
		const cal = {};

		// Iterating over days
		for (let d = 0; d < days; d++) {
			// Creating the date
			const date = new Date(start.getTime());
			date.setDate(start.getDate() + d);

			// Randomly generating states
			for (let i = 0; i < 4; i++) {
				const randomHour = Math.round(Math.random() * 24);
				date.setHours(randomHour, 0, 0, 0);
				cal[date.toISOString()] = Math.random() > 0.5 ? 'booked' : 'blocked';
			}
		}
		return cal;
	})();

	function getState(datetime: Date): MiniCalCellState {
		const state = cal[datetime.toISOString()];
		return state ? state : 'free';
	}

	let edits: Record<string, Record<string, MiniCalCellState>> = {};
	$tools.forEach((t) => {
		edits[t.id] = {};
	});

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
</script>

<!--  -->

<div class="main__cont">
	{#each $tools as t}
		<div class="cal__container">
			<p><strong>{t.attributes.name}</strong></p>
			<MiniCal {start} let:dateTime>
				{@const state = getState(dateTime)}
				<MiniCalCell
					{dateTime}
					{state}
					on:edit={(e) => {
						updateEdits(e, t.id);
					}}
				/>
			</MiniCal>
			<pre>{JSON.stringify(edits[t.id], null, 2)}</pre>
		</div>
	{/each}
</div>

<!--  -->
<style>
	.main__cont {
		display: flex;
		flex-flow: row wrap;
		gap: var(--s-2);
	}

	.cal__container {
		flex-basis: 30%;
	}
</style>
