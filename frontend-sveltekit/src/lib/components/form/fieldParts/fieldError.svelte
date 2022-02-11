<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from '../key';
	import { icons } from '../icons';

	export let fieldName: string;

	const { errors } = getContext(key);
</script>

<!--  -->

{#if $errors[fieldName]}
	<div class="field__error">
		<svelte:component this={icons.error} class="field__error__icon" />
		<small class="field__error__text" {...$$props}>{$errors[fieldName]}</small>
	</div>
{/if}
