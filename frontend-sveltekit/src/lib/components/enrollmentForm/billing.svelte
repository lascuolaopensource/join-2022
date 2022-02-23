<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { validators } from 'shared';

	import { Form, TextField, RadioField, FormPage } from '$lib/components/form';

	//

	export let onSubmit: (values: validators.FBilling) => void;

	const billingOptions = validators.billingOptions;
	const radioValues = [
		{ value: billingOptions[0], label: 'Io' },
		{ value: billingOptions[1], label: 'Qualcun altro per me' },
		{ value: billingOptions[2], label: 'Attività commerciale' }
	];

	const me = {
		cf: ''
	};

	const person = {
		name: '',
		surname: '',
		cf: ''
	};

	const company = {
		name: '',
		vat: '',
		sdi: ''
	};

	const address = {
		cap: '',
		town: '',
		street: '',
		province: ''
	};

	export let initialValues: validators.FBilling = {
		billingOption: null,
		// Opzioni
		me,
		person,
		company,
		// Generici
		email: '',
		address
	};

	const validationSchema = validators.billingVal;

	const formContext = createForm({ initialValues, validationSchema, onSubmit });

	const { form } = formContext;

	$: if ($form.billingOption == billingOptions[0]) {
		$form.me = me;
		$form.person = null;
		$form.company = null;
	} else if ($form.billingOption == billingOptions[1]) {
		$form.me = null;
		$form.person = person;
		$form.company = null;
	} else if ($form.billingOption == billingOptions[2]) {
		$form.me = null;
		$form.person = null;
		$form.company = company;
	}
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
				<!-- Io -->
				<TextField name="me.cf" labelText="Codice fiscale" type="text" />
			{:else if $form.billingOption == billingOptions[1]}
				<!-- Persona fisica -->
				<TextField name="person.name" labelText="Nome" type="text" />
				<TextField name="person.surname" labelText="Cognome" type="text" />
				<TextField name="person.cf" labelText="Codice fiscale" type="text" />
			{:else if $form.billingOption == billingOptions[2]}
				<!-- Azienda -->
				<TextField name="company.name" labelText="Nome società" type="text" />
				<TextField name="company.vat" labelText="Partita IVA" type="text" />
				<TextField name="company.sdi" labelText="Codice SDI" type="text" />
			{/if}

			{#if $form.billingOption != billingOptions[0]}
				<TextField name="email" labelText="Email" type="email" />
			{/if}

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
