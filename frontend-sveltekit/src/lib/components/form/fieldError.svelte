<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import get from 'get-value';
	import { icons } from './icons';

	export let name: string;

	const { errors } = getContext(key);
</script>

<!--  -->

{#if get($errors, name)}
	<div class="field__error">
		<svelte:component this={icons.error} class="field__error__icon" />
		<small class="field__error__text" {...$$props}>{get($errors, name)}</small>
	</div>
{/if}
