<script lang="ts" context="module">
	export const multipageKey = 'multi';
</script>

<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { FormError } from '$lib/components/form';

	export let handleSubmit: (pagesState) => Promise<void>;
	export let pages: Array<Function>;

	export let extraProps = {};

	//

	let index = writable(0);

	function onBack(values) {
		pagesState[$index] = values;
		if ($index > 0) {
			$index -= 1;
		}
	}

	const pagesState = [];

	async function onSubmit(values) {
		pagesState[$index] = values;
		if ($index < pages.length - 1) {
			$index += 1;
		} else if ($index == pages.length - 1) {
			await handleSubmit(pagesState);
		}
	}

	//

	setContext(multipageKey, {
		index,
		pagesState,
		onBack
	});
</script>

<!--  -->

<FormError />
<svelte:component
	this={pages[$index]}
	initialValues={pagesState[$index]}
	{onSubmit}
	{...extraProps}
/>
