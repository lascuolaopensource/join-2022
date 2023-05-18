<script lang="ts" context="module">
	export const multipageKey = 'multi';
</script>

<script lang="ts">
	/**
	 * Nota: quando si creano le pagine del form
	 * bisogna sempre dare un nome al form, per il localstorage
	 *
	 * O per lo meno ricordarsi che la singola pagina salva in localstorage
	 */

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	//

	export let handleSubmit: (pagesState: any) => Promise<void>;
	export let pages: Array<Function>;

	export let extraProps = {};

	//

	const index = writable(0);
	const pagesState: Array<any> = [];

	function onBack(values: any) {
		pagesState[$index] = values;
		if ($index > 0) {
			$index -= 1;
		}
	}

	async function onSubmit(values: any) {
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

<svelte:component
	this={pages[$index]}
	initialValues={pagesState[$index]}
	{onSubmit}
	{...extraProps}
/>
