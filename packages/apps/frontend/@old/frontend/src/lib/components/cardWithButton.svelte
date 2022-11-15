<script lang="ts">
	import IconButton from './iconButton.svelte';
	import { icons } from '$lib/icons';

	export let showButton = false;
</script>

<!--  -->

<div
	class="border-2 p-2 flex flex-row flex-nowrap justify-between items-center"
>
	<slot />
	{#if showButton}
		<IconButton icon={icons.close} on:click />
	{/if}
</div>
