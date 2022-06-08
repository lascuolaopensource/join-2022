<script lang="ts" context="module">
	import { setContext, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const KEY = {};

	type SelectableListCtx = {
		items: Writable<Array<any>>;
		selection: Writable<Array<any>>;
	};

	function setCtx(ctx: SelectableListCtx) {
		setContext(KEY, ctx);
	}

	export function getCtx(): SelectableListCtx {
		return getContext(KEY);
	}
</script>

<script lang="ts">
	import { writable } from 'svelte/store';

	export let selection: Writable<Array<any>>;
	let items = writable<Array<any>>([]);

	setCtx({ items, selection });
</script>

<!--  -->
<div>
	<slot />
</div>
