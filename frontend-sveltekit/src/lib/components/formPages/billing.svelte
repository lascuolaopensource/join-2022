<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import { f } from 'shared';

	import { Form, TextField, RadioField, FormPage } from '$lib/components/form';

	//

	export let onSubmit: (values) => void;
	export let initialValues = f.billing.bValues;

	//

	const billingOptions = f.billing.bOptions;
	const radioValues = [
		{ value: billingOptions[0], label: 'Io' },
		{ value: billingOptions[1], label: 'Qualcun altro per me' },
		{ value: billingOptions[2], label: 'Attività commerciale' }
	];

	const formContext = createForm({
		initialValues,
		validationSchema: f.billing.bSchema,
		onSubmit
	});
	const { form } = formContext;

	$: if ($form.billingOption == billingOptions[0]) {
		$form.me = f.billing.bMeValues;
		$form.person = null;
		$form.company = null;
	} else if ($form.billingOption == billingOptions[1]) {
		$form.me = null;
		$form.person = f.billing.bPersonValues;
		$form.company = null;
	} else if ($form.billingOption == billingOptions[2]) {
		$form.me = null;
		$form.person = null;
		$form.company = f.billing.bCompanyValues;
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
