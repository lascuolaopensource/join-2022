<script lang="ts">
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import type { SubmitFunction } from '$app/forms';
	import { enhance, applyAction } from '$app/forms';

	import { createForm } from 'svelte-forms-lib';
	import type { InitialValues, Validate, ValidationSchema } from './types';
	import { key } from './key';

	import { Button } from 'flowbite-svelte';
	import Error from './Error.svelte';

	//

	export let initialValues: InitialValues = {};
	export let validate: Validate | undefined = undefined;
	export let validationSchema: ValidationSchema | undefined = undefined;
	export let onSubmit: () => void = () => {};

	export let action = '';
	export let error = '';
	export let buttonText = 'Submit';

	export let lsKey = 'form'; // key for localstorage

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
		// Reset error
		error = '';
		// Set loading
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

	/**
	 * Checking form validity
	 *
	 * $isValid store from svelte-forms-lib
	 * doesn't seem to work when the form is empty
	 */

	// const isFilledAndValid = writable<boolean>(false);
	// $: $isFilledAndValid = Object.values($touched).every((e) => e) && $isValid;
</script>

<!--  -->

<form {action} method="POST" use:enhance={handleEnhance} class="space-y-8">
	<!-- Default slot for fields -->
	<slot />

	{#if error}
		<Error {error} />
	{/if}

	{#if $isSubmitting}
		<slot name="loading">
			<p>Submitting...</p>
		</slot>
	{/if}

	<!-- Submit button -->
	<div class="flex flex-row-reverse">
		<Button type="submit" id="submit">{buttonText}</Button>
	</div>

	<pre>{JSON.stringify($form, null, 2)}</pre>
	<pre>{JSON.stringify($errors, null, 2)}</pre>
</form>
