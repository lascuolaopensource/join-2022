<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from '../form.svelte';
	import get from 'get-value';

	import FieldWrapper from '../fieldParts/fieldWrapper.svelte';

	//

	// Field props
	export let items: Array<{ value: string; label: string }>;
	export let name: string;
	// Label props
	export let labelText = '';
	export let labelIcon: Function = null;
	export let labelLink: { text: string; href: string } = null;
	// Bottom props
	export let helperText = '';

	//

	const { form, handleChange } = getContext(formKey);

	// Maybe fix:
	// Radio button needs this kind of reactive binding
	// Otherwise it doesn't update after form localstorage refresh
	let group;
	$: {
		group = get($form, name);
	}
</script>

<!--  -->

<FieldWrapper fieldName={name} {labelText} {labelIcon} {labelLink} {helperText}>
	<div class="field__radio">
		{#each items as item, i}
			<div class="field__radio__item">
				<input
					{name}
					id={name + i}
					type="radio"
					class="field__radio__circle"
					value={item.value}
					bind:group
					on:change={handleChange}
					on:blur={handleChange}
				/>
				<label class="field__radio__text" for={name + i}>{item.label}</label>
			</div>
		{/each}
	</div>
</FieldWrapper>
