<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from './form.svelte';
	import get from 'get-value';

	import FieldWrapper from './fieldParts/fieldWrapper.svelte';

	//

	// Field props
	export let name: string;
	export let type: 'text' | 'email' | 'password' = 'text';
	// Label props
	export let labelText = '';
	export let labelIcon: Function = null;
	export let labelLink: { text: string; href: string } = null;
	// Input props
	export let placeholder = '';
	// Bottom props
	export let helperText = '';

	// This is needed to change dynamically the type of the input
	// Solution provided by
	// https://github.com/sveltejs/svelte/issues/3921#issuecomment-880664654
	const setType = (node) => {
		node.type = type;
	};

	//

	const { form, errors, handleChange } = getContext(formKey);
</script>

<!--  -->

<FieldWrapper fieldName={name} {labelText} {labelIcon} {labelLink} {helperText}>
	<input
		use:setType
		{name}
		id={name}
		value={get($form, name)}
		class="field__input"
		class:field__input-error={$errors[name]}
		{placeholder}
		on:keyup={handleChange}
		on:blur={handleChange}
	/>
</FieldWrapper>
