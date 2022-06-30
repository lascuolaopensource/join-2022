<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export const formError = writable<string | null>(null);

	export function setFormError(message: string) {
		formError.set(message);
	}

	export function clearFormError() {
		formError.set(null);
	}
</script>

<script lang="ts">
	import { icons } from '$lib/icons';
	import IconButton from '$lib/components/iconButton.svelte';

	export let closeButton: boolean = true;

	function hideError() {
		$formError = null;
	}
</script>

<!--  -->

{#if $formError}
	<div
		class="bg-red-600 flex flex-row flex-nowrap items-center justify-between p-3"
	>
		<!-- Form icon -->
		<svelte:component this={icons.form.error} class="fill-white" />

		<!-- Form text -->
		<p class="text-white grow ml-1">
			{$formError}
		</p>

		<!-- Form close button -->
		{#if closeButton}
			<IconButton icon={icons.form.close} on:click={hideError} transparent />
		{/if}
	</div>
{/if}
