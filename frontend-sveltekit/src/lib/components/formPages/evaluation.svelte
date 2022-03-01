<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

	import {
		Form,
		FormPage,
		TextField,
		TextAreaField
	} from '$lib/components/form';

	//

	export let letterNeeded: boolean;
	export let portfolioNeeded: boolean;
	export let cvNeeded: boolean;

	export let onSubmit: (values) => void;
	export let initialValues = f.evaluation.evValues;

	//

	// Initial values setup
	initialValues.letterNeeded = letterNeeded;
	initialValues.portfolioNeeded = portfolioNeeded;
	initialValues.cvNeeded = cvNeeded;

	// Creating form
	const formContext = createForm({
		initialValues,
		validationSchema: f.evaluation.evSchema,
		onSubmit
	});
</script>

<!--  -->

<Form {formContext}>
	<FormPage>
		<h1>Informazioni per valutazione</h1>

		{#if initialValues.cvNeeded}
			<TextField name="cv" labelText="Link al CV" type="text" />
		{/if}
		{#if initialValues.portfolioNeeded}
			<TextField name="portfolio" labelText="Link al portfolio" type="text" />
		{/if}
		{#if initialValues.letterNeeded}
			<TextAreaField name="letter" labelText="Lettera motivazionale" />
		{/if}
	</FormPage>
</Form>
