<script lang="ts">
	import type { SubmitFunction } from '$app/forms';
	import { enhance, applyAction } from '$app/forms';
	import { createForm } from 'svelte-forms-lib';

	export let action: string = '';
	export let error: string = '';

	let isSubmitting = false;

	const handleEnhance: SubmitFunction = ({ form, data, action, cancel }) => {
		isSubmitting = true;
		return async ({ result, update }) => {
			await applyAction(result);
			isSubmitting = false;
		};
	};
</script>

<!--  -->

<form {action} method="POST" use:enhance={handleEnhance}>
	<!-- Default slot for fields -->
	<slot />

	{#if error}
		<slot name="error">
			{error}
		</slot>
	{/if}

	{#if isSubmitting}
		<slot name="loading">
			<p>Submitting...</p>
		</slot>
	{/if}

	<slot name="buttons" />
</form>
