<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import type { FormState } from './types';

	import { Input } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/types';
	import FieldInfo from '$lib/components/FieldInfo.svelte';

	//

	export let name: string;
	export let type: InputType = 'text';

	export let label = '';
	export let help = '';
	export let placeholder = '';
	export let required = false;

	export let id = name;

	//

	const { form, errors, handleChange } = getContext(key) as FormState;

	let error: string | undefined;
	$: error = $errors[name];

	let value: string | undefined;
	$: value = $form[name];

	let color: 'base' | 'green' | 'red' = 'base';
	$: error ? (color = 'red') : (color = 'base');
</script>

<!--  -->

<FieldInfo fieldName={name} {label} {help} {error}>
	<Input
		{color}
		{name}
		{id}
		{placeholder}
		{required}
		{type}
		{value}
		on:change={handleChange}
		on:blur={handleChange}
		on:input={handleChange}
	/>
</FieldInfo>
