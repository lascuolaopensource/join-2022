<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from '../form.svelte';
	import get from 'get-value';

	import FieldWrapper from '../fieldParts/fieldWrapper.svelte';

	//

	// Field props
	export let name: string;
	// Label props
	export let labelText = '';
	export let labelIcon: Function = null;
	export let labelLink: { text: string; href: string } = null;
	// Input props
	export let placeholder = '';
	// Bottom props
	export let helperText = '';

	//

	const { form, errors, handleChange } = getContext(formKey);
</script>

<!--  -->

<FieldWrapper fieldName={name} {labelText} {labelIcon} {labelLink} {helperText}>
	<textarea
		{name}
		id={name}
		{placeholder}
		on:keyup={handleChange}
		on:blur={handleChange}
		class="
			bg-gray-200 hover:bg-gray-300 p-3 w-full h-60
			{get($errors, name) ? 'outline-2 outline-red-600' : ''}
		"
	/>
</FieldWrapper>
