<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

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

	export let initialValues = {
		letterNeeded,
		letter: '',
		portfolioNeeded,
		portfolio: '',
		cvNeeded,
		cv: ''
	};

	const validationSchema = yup.object({
		//
		letterNeeded: yup.boolean().required(),
		letter: yup.string().when('letterNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		}),
		//
		portfolioNeeded: yup.boolean().required(),
		portfolio: yup.string().when('portfolioNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		}),
		//
		cvNeeded: yup.boolean().required(),
		cv: yup.string().when('cvNeeded', {
			is: true,
			then: (schema) => schema.required(),
			otherwise: (schema) => schema.nullable()
		})
	});

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
