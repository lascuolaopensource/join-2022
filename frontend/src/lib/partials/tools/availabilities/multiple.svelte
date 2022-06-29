<script lang="ts">
	import { writable } from 'svelte/store';
	import { toolNeeds, toolDates } from '$lib/stores';

	import { Modal, Button } from '$lib/components';

	//

	export let combo: Array<Array<[string, string]>>;

	//

	// Modal
	const visible = writable(false);
	const open = () => {
		$visible = true;
		$toolDates = []; // Cleaning up
	};

	// Button validation
	let valid = false;
	$: valid =
		$toolDates.every((e) => e) && $toolDates.length == $toolNeeds.length;
</script>

<!--  -->

<!-- Card with all the hours -->

<div class="space-y-4 bg-slate-200 hover:bg-slate-300 p-4" on:click={open}>
	{#each combo as day}
		{@const date = new Date(day[0][0]).toLocaleDateString('IT-it')}
		<div>
			<p class="font-bold mb-1">{date}</p>
			<div>
				{#each day as option}
					{@const startTime = new Date(option[0]).getHours()}
					{@const endTime = new Date(option[1]).getHours()}
					<p>{startTime} → {endTime}</p>
				{/each}
			</div>
		</div>
	{/each}
</div>

<!-- Modal with selection -->

<Modal {visible}>
	<!-- List with selection -->

	<div class="space-y-4">
		{#each combo as day, i}
			{@const date = new Date(day[0][0]).toLocaleDateString('IT-it')}
			<div>
				<p class="font-bold mb-1">{date}</p>
				<fieldset class="flex flex-col flex-nowrap">
					{#each day as option}
						{@const startTime = new Date(option[0]).getHours()}
						{@const endTime = new Date(option[1]).getHours()}
						<label>
							<input type="radio" bind:group={$toolDates[i]} value={option} />
							{startTime} → {endTime}
						</label>
					{/each}
				</fieldset>
			</div>
		{/each}
	</div>

	<!-- Submit button -->

	<div slot="bottom" class="flex flex-row flex-nowrap justify-end p-4">
		<Button disabled={!valid} on:click>Avanti</Button>
	</div>
</Modal>
