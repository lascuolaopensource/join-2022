<script lang="ts" context="module">
	export type RadioOption = {
		label: string;
		value: string;
	};

	export type RadioOptions = Array<RadioOption>;
</script>

<script lang="ts">
	import FieldWrapper from './FieldWrapper.svelte';
	import FieldInfo from '$lib/components/FieldInfo.svelte';
	import { Radio } from 'flowbite-svelte';

	export let name: string;
	export let options: RadioOptions;
	export let label = '';
</script>

<FieldWrapper {name} let:value let:error let:handleChange>
	<FieldInfo fieldName={name} {label} {error}>
		{#each options as item, i (item.value)}
			{@const id = `${name}-${i}`}
			<div class="rounded border border-gray-200 dark:border-gray-700">
				<Radio
					{id}
					{name}
					group={value}
					value={item.value}
					on:change={handleChange}
					on:blur={handleChange}
					bordered
					class="w-full p-4"
				>
					{item.label}
				</Radio>
			</div>
		{/each}
	</FieldInfo>
</FieldWrapper>
