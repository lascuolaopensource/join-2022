<script lang="ts">
	import { getContext } from 'svelte';
	import { formKey } from '../form.svelte';
	import get from 'get-value';

	import FieldError from './fieldError.svelte';

	//

	export let fieldName: string;
	export let helperText = '';

	//

	const { errors } = getContext(formKey);
</script>

<!--  -->

{#if helperText || get($errors, fieldName)}
	<div class="field__bottom">
		<!-- Helper text -->
		{#if helperText}
			<small class="field__helperText">{helperText}</small>
		{/if}
		<!-- Field error -->
		<FieldError {fieldName} />
	</div>
{/if}
