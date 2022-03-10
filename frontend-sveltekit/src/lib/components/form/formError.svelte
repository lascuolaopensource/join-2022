<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export const formError = writable<string>(null);

	export function setFormError(message: string) {
		formError.set(message);
	}

	export function clearFormError() {
		formError.set(null);
	}
</script>

<script lang="ts">
	import { icons } from '$lib/icons/icons.svelte';

	export let closeButton: boolean = true;

	function hideError() {
		$formError = null;
	}
</script>

<!--  -->

{#if $formError}
	<div class="form__err">
		<!-- Form icon -->
		<svelte:component this={icons.form.error} class="form__err__icon" />

		<!-- Form text -->
		<p class="form__err__text">
			{$formError}
		</p>

		<!-- Form close button -->
		{#if closeButton}
			<button class="form__err__btn" on:click={hideError}>
				<svelte:component this={icons.form.close} class="form__err__btn__icon" />
			</button>
		{/if}
	</div>
{/if}
