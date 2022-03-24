<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from '../form.svelte';
	import { icons } from '$lib/icons';
	import get from 'get-value';

	export let fieldName: string;

	const { errors } = getContext(formKey);
</script>

<!--  -->

{#if get($errors, fieldName)}
	<div class="field__error">
		<svelte:component this={icons.form.error} class="field__error__icon" />
		<small class="field__error__text" {...$$props}
			>{get($errors, fieldName)}</small
		>
	</div>
{/if}
