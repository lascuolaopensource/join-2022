<script lang="ts">
	import FieldWrapper from './FieldWrapper.svelte';

	import { Textarea } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte/types';
	import FieldInfo from '$lib/components/FieldInfo.svelte';
	import type { AnchorPropOptional } from '$lib/components/types';

	//

	export let name: string;
	export let type: InputType = 'text';

	export let label = '';
	export let help = '';
	export let placeholder = '';
	export let required = false;
	export let link: AnchorPropOptional = undefined;

	export let id = name;
</script>

<!--  -->

<FieldWrapper {name} let:color let:error let:handleChange let:value>
	<FieldInfo fieldName={name} {label} {help} {error} {link}>
		<Textarea
			{color}
			{name}
			{id}
			{placeholder}
			{required}
			{type}
			{value}
			on:keypress={handleChange}
			on:change={handleChange}
			on:blur={handleChange}
			on:input={handleChange}
		/>
	</FieldInfo>
</FieldWrapper>
