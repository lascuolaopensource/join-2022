<script lang="ts">
	import type { Writable } from 'svelte/store';
	import IconButton from './iconButton.svelte';
	import { icons } from '$lib/icons';

	export let visible: Writable<boolean>;
	export let title = '';

	function close() {
		$visible = false;
	}
</script>

<!-- -->

{#if $visible}
	<div
		class="
			modal
			fixed top-0 left-0
			w-screen h-screen z-[8000] bg-white
			flex flex-col flex-nowrap"
	>
		<div
			class="
				flex flex-row flex-nowrap justify-between items-center
				bg-white border-b-2 border-black px-4 py-2
			"
		>
			<p class="font-bold">{title}</p>
			<IconButton icon={icons.close} on:click={close} />
		</div>
		<div class="grow p-4 overflow-y-auto">
			<slot />
		</div>
		<slot name="bottom" />
	</div>
{/if}

<style>
	.modal {
		margin: 0 !important;
	}
</style>
