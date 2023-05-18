<script lang="ts">
	import { Label, Helper, A } from 'flowbite-svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';
	import type { AnchorPropOptional } from './types';

	export let label: string = '';
	export let help: string = '';
	export let error: string = '';
	export let fieldName: string = '';
	export let link: AnchorPropOptional = undefined;

	let color: 'gray' | 'green' | 'red' | 'disabled' = 'gray';
	$: error ? (color = 'red') : (color = 'gray');
</script>

<!--  -->

<div class="space-y-2">
	{#if label || link}
		<div class="flex flex-row justify-between">
			{#if label}
				<Label for={fieldName} {color}>{label}</Label>
			{/if}
			{#if link}
				<Label {color} for={fieldName}>
					<A href={link.href}>{link.text}</A>
				</Label>
			{/if}
		</div>
	{/if}

	<slot />

	{#if help || error}
		<div class="space-y-1">
			{#if help}
				<div class="flex space-x-1">
					<Information class="fill-gray-600" />
					<Helper color="gray">{help}</Helper>
				</div>
			{/if}

			{#if error}
				<div class="flex space-x-1">
					<WarningAltFilled class="fill-red-600" />
					<Helper color="red">{error}</Helper>
				</div>
			{/if}
		</div>
	{/if}
</div>
