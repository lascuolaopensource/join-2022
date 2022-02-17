<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from './form.svelte';
	import { multipageKey } from './multipageForm.svelte';

	import SubmitButton from './submitButton.svelte';

	//
	const { form } = getContext(formKey);
	const { index, onBack } = getContext(multipageKey);

	if (!index || !onBack) {
		throw new Error('MultipageForm component is missing!');
	}

	function back() {
		onBack($form);
	}
</script>

<!--  -->

<slot />
<div class="form__page__btns">
	<div class="form__page__back">
		{#if $index > 0}
			<button class="btn btn-secondary" on:click|preventDefault={back}
				>back</button
			>
		{/if}
	</div>
	<SubmitButton>Avanti</SubmitButton>
</div>

<style>
	div {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
</style>
