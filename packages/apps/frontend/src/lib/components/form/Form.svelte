<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { SubmitFunction } from '$app/forms';
	import { enhance, applyAction } from '$app/forms';

	import { createForm } from 'svelte-forms-lib';
	import type { InitialValues, Validate, ValidationSchema } from './types';
	import FormError from './FormError.svelte';

	//

	export let initialValues: InitialValues = {};
	export let validate: Validate | undefined = undefined;
	export let validationSchema: ValidationSchema | undefined = undefined;
	export let onSubmit: () => void = () => {};

	export let action = '';
	export let error = '';

	export let key = 'form';
	// This variable acts both as:
	// - the key to store the form in localStorage
	// - the key for the svelte context

	/**
	 * Creating form
	 */

	const formContext = createForm({
		initialValues,
		validate,
		validationSchema,
		onSubmit
	});

	/**
	 * Extracting form props
	 *
	 * formContext exports also 'isSubmitting'
	 * but we don't need it here,
	 * cause we have our own 'isSubmitting' store
	 */

	const {
		form,
		errors,
		touched,
		state,
		handleChange,
		handleSubmit,
		updateField,
		updateInitialValues,
		updateTouched,
		updateValidateField,
		validateField,
		isValid
	} = formContext;

	/**
	 * Logic for displaying Loading UI
	 */

	let isSubmitting = writable(false);

	const handleEnhance: SubmitFunction = ({ form, data, action, cancel }) => {
		$isSubmitting = true;
		return async ({ result, update }) => {
			await applyAction(result);
			$isSubmitting = false;
		};
	};

	/**
	 * Setting context
	 */

	setContext(key, {
		form,
		errors,
		touched,
		state,
		handleChange,
		handleSubmit,
		updateField,
		updateInitialValues,
		updateTouched,
		updateValidateField,
		validateField,
		isValid,
		isSubmitting
	});
</script>

<!--  -->

<form {action} method="POST" use:enhance={handleEnhance} class="space-y-8">
	<!-- Default slot for fields -->
	<slot />

	{#if error}
		<FormError {error} />
	{/if}

	{#if $isSubmitting}
		<slot name="loading">
			<p>Submitting...</p>
		</slot>
	{/if}

	<slot name="buttons" />
</form>
