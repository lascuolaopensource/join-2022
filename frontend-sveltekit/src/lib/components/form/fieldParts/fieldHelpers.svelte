<script lang="ts">
	import { getContext } from 'svelte';
	import { key } from '../key';

	import FieldError from './fieldError.svelte';

	//

	export let fieldName: string;
	export let helperText = '';

	//

	const { errors } = getContext(key);
</script>

<!--  -->

{#if helperText || $errors[fieldName]}
	<div class="field__bottom">
		<!-- Helper text -->
		{#if helperText}
			<small class="field__helperText">{helperText}</small>
		{/if}
		<!-- Field error -->
		<FieldError {fieldName} />
	</div>
{/if}
