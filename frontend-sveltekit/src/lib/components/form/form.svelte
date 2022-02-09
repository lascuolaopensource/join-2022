<script lang="ts">
	import { setContext } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import { key } from './key';

	export let initialValues = {};
	export let validate = null;
	export let validationSchema = null;
	export let onSubmit = () => {
		throw new Error(
			'onSubmit is a required property in <Form /> when using the fallback context'
		);
	};

	// Creating form
	// (We also export it in case one wants to pass a created form)

	export let context = createForm({
		initialValues,
		onSubmit,
		validate,
		validationSchema
	});

	// Setting context

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
		validateField
	} = context;

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
		validateField
	});
</script>

<form on:submit={handleSubmit} {...$$restProps}>
	<slot
		{form}
		{errors}
		{touched}
		{state}
		{handleChange}
		{handleSubmit}
		{updateField}
		{updateInitialValues}
		{updateTouched}
		{updateValidateField}
		{validateField}
	/>
</form>
