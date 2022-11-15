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
	<div class="flex flex-row flex-nowrap items-center justify-start">
		<svelte:component this={icons.form.error} class="fill-red-600" />
		<small class="text-red-600 text-sm ml-1" {...$$props}
			>{get($errors, fieldName)}</small
		>
	</div>
{/if}
