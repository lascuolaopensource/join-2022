<script lang="ts">
	import { onMount } from 'svelte';

	export let className = '';
	export let id = '';

	onMount(() => {
		const overflowClass = 'overflow-hidden';
		document.body.classList.add(overflowClass);
		return () => {
			document.body.classList.remove(overflowClass);
		};
	});
</script>

<div {id} class="fixed top-0 left-0 w-screen h-screen z-[100] {className}">
	<slot />
</div>

<style>
	/* Needed to remove eventual external margins */
	div {
		margin: 0 !important;
	}
</style>
