<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { validators } from 'shared';

	import {
		Form,
		FormPage,
		TextField,
		TextAreaField
	} from '$lib/components/form';

	//

	export let letterNeeded;
	export let portfolioNeeded;
	export let cvNeeded;

	export let onSubmit: (values) => void;

	export let initialValues: validators.FEvaluation = {
		letterNeeded,
		letter: '',
		portfolioNeeded,
		portfolio: '',
		cvNeeded,
		cv: ''
	};

	const validationSchema = validators.evaluationVal;

	const formContext = createForm({ initialValues, validationSchema, onSubmit });
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
