<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	import { Form, TextField, RadioField, FormPage } from '$lib/components/form';

	//

	export let onSubmit: (values: typeof initialValues) => void;

	const billingOptions = ['person', 'company'];
	const radioValues = [
		{ value: billingOptions[0], label: 'Persona fisica' },
		{ value: billingOptions[1], label: 'Attività commerciale' }
	];

	export let initialValues = {
		billingOption: '',
		// Persona fisica
		person: {
			name: '',
			surname: '',
			cf: ''
		},
		// Azienda
		company: {
			name: '',
			vat: '',
			sdi: ''
		},
		// Generici
		email: '',
		address: {
			cap: '',
			town: '',
			street: '',
			province: ''
		}
	};

	const validationSchema = yup.object({
		billingOption: yup.string().oneOf(billingOptions).required(),
		// Persona fisica
		person: yup.object().when('billingOption', {
			is: billingOptions[0],
			then: (schema) =>
				schema.required().shape({
					name: yup.string().required(),
					surname: yup.string().required(),
					cf: yup.string().required()
				}),
			otherwise: (schema) => schema.nullable()
		}),
		// Azienda
		company: yup.object().when('billingOption', {
			is: billingOptions[1],
			then: (schema) =>
				schema.required().shape({
					name: yup.string().required(),
					vat: yup.string().required(),
					sdi: yup.string().required()
				}),
			otherwise: (schema) => schema.nullable()
		}),
		// Generici
		email: yup.string().email().required(),
		address: yup
			.object({
				cap: yup.string().required(),
				town: yup.string().required(),
				province: yup.string().required(),
				street: yup.string().required()
			})
			.required()
	});

	const formContext = createForm({ initialValues, validationSchema, onSubmit });

	const { form } = formContext;
</script>

<!--  -->

<Form {formContext}>
	<FormPage>
		<h1>Dati di fatturazione</h1>

		<RadioField
			name="billingOption"
			items={radioValues}
			labelText="Chi paga?"
		/>

		{#if $form.billingOption}
			<hr />

			{#if $form.billingOption == billingOptions[0]}
				<!-- Persona fisica -->
				<TextField name="person.name" labelText="Nome" type="text" />
				<TextField name="person.surname" labelText="Cognome" type="text" />
				<TextField name="person.cf" labelText="Codice fiscale" type="text" />
			{:else if $form.billingOption == billingOptions[1]}
				<!-- Azienda -->
				<TextField name="company.name" labelText="Nome società" type="text" />
				<TextField name="company.vat" labelText="Partita IVA" type="text" />
				<TextField name="company.sdi" labelText="Codice SDI" type="text" />
			{/if}

			<TextField name="email" labelText="Email" type="email" />

			<h2>Indirizzo</h2>
			<TextField name="address.street" labelText="Indirizzo" type="text" />
			<TextField name="address.town" labelText="Città" type="text" />
			<div class="field-w30">
				<TextField name="address.province" labelText="Provincia" type="text" />
			</div>
			<div class="field-w50">
				<TextField name="address.cap" labelText="CAP" type="text" />
			</div>
		{/if}
	</FormPage>
</Form>

<!--  -->
<style>
	.field-w30 {
		width: 30%;
	}

	.field-w50 {
		width: 50%;
	}
</style>
