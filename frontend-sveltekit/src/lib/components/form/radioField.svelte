<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from './key';
	import get from 'get-value';

	import FieldWrapper from './fieldParts/fieldWrapper.svelte';

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

	const { form, errors, handleChange } = getContext(key);
</script>

<!--  -->

<FieldWrapper fieldName="" {labelText} {labelIcon} {labelLink} {helperText}>
	<div class="field__radio">
		{#each items as item, i}
			<div class="field__radio__item">
				<input
					{name}
					id={name + i}
					type="radio"
					class="field__radio__circle"
					value={item.value}
					group={get($form, name)}
					on:change={handleChange}
					on:blur={handleChange}
				/>
				<label class="field__radio__text" for={name + i}>{item.label}</label>
			</div>
		{/each}
	</div>
</FieldWrapper>
