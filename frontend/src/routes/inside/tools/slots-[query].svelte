<script lang="ts">
	import { page } from '$app/stores';
	import { req } from '$lib/requestUtils';
	import type { endpoints as e } from 'shared';
	import { helpers as h } from 'shared';

	import { toolDayRequest, toolDaysRequest } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { stringify } from 'qs';
	import { object } from 'yup/lib/locale';

	const query: Array<{ id: string; tool_ids: Array<string>; hours: number }> =
		JSON.parse(decodeURIComponent($page.params.query));
	const promise = req.checkSlots({ days: query });

	//

	const multipleData: Record<string, [Date, Date]> = {};
	for (let i = 0; i < query.length; i++) {
		multipleData[i.toString()] = null;
	}

	//

	async function goToRecapSingle(option: any) {
		$toolDayRequest = {
			tool_ids: query[0].tool_ids,
			start: new Date(option[0]),
			end: new Date(option[1])
		};
		await goto('/inside/tools/recap');
	}

	async function goToRecapMultiple() {
		console.log(multipleData);
		// Checking if not null
		if (Object.values(multipleData).every((e) => e != null)) {
			// Checking if dates are one after the other
			const starts: Array<Date> = [];
			for (let v of Object.values(multipleData)) {
				const start = new Date(v[0]);
				starts.push(h.date.setHours(start, 0, 0, 0, 0));
			}

			// Having listed the starts, we check
			const checks = [];
			for (let s of starts) {
				// Getting next
				const nextIdx = starts.indexOf(s) + 1;
				if (nextIdx < starts.length) {
					const nextStart = starts[nextIdx];
					checks.push(h.date.addDays(s, 1).getTime() == nextStart.getTime());
				}
			}

			// If all good, we build and send the request
			if (checks.every((s) => s)) {
				$toolDaysRequest = [];
				for (let [idx, day] of Object.entries(query)) {
					const data = multipleData[idx.toString()];
					$toolDaysRequest.push({
						tool_ids: day.tool_ids,
						start: new Date(data[0]),
						end: new Date(data[1])
					});
				}
				await goto('/inside/tools/recap');
			}
		}
	}
</script>

<!--  -->

<pre>{JSON.stringify(query, null, 2)}</pre>
{#await promise then res}
	{#if res.kind == 'single'}
		{#each Object.entries(res.data) as [day, options]}
			<div>
				<h3 class="text-lg font-bold">{day}</h3>
				{#each options as option}
					<div
						class="flex flex-row justify-between items-center p-4 border-2 mb-2"
					>
						<div>
							{new Date(option[0]).getHours()} →
							{new Date(option[1]).getHours()}
						</div>
						<button
							class="btn btn-secondary"
							on:click={() => {
								goToRecapSingle(option);
							}}>→</button
						>
					</div>
				{/each}
			</div>
		{/each}
	{:else if res.kind == 'multiple'}
		{#each res.data as combo}
			<div class="p-4 border-2 mb-2">
				<div>
					{#each combo as day}
						{@const options = day.options}
						<p class="font-bold">
							{new Date(options[0][0]).toLocaleDateString('IT-it')}
						</p>
						<div>
							<fieldset>
								{#each options as option}
									<div>
										<input
											type="radio"
											id="louie"
											name={day.day}
											value={option}
											bind:group={multipleData[day.day]}
										/>
										<label for="louie">
											{new Date(option[0]).getHours()} →
											{new Date(option[1]).getHours()}
										</label>
									</div>
								{/each}
							</fieldset>
						</div>
					{/each}
				</div>
				<button class="btn btn-secondary" on:click={goToRecapMultiple}>→</button
				>
			</div>
		{/each}
	{/if}
{/await}
