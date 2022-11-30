<script lang="ts">
	import { Label, Helper } from 'flowbite-svelte';
	import WarningAltFilled from 'carbon-icons-svelte/lib/WarningAltFilled.svelte';
	import Information from 'carbon-icons-svelte/lib/Information.svelte';

	export let label: string = '';
	export let help: string = '';
	export let error: string = '';
	export let fieldName: string = '';

	let color: 'gray' | 'green' | 'red' | 'disabled' = 'gray';
	$: error ? (color = 'red') : (color = 'gray');
</script>

<!--  -->

<div class="space-y-2">
	{#if label}
		<Label {color} for={fieldName}>{label}</Label>
	{/if}

	<slot />

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
</div>
