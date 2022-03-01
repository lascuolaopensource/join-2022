<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { post, headersAuth, endpoints } from '$lib/requestUtils';
	import { setFormError } from '$lib/components/form';
	import { f } from 'shared';

	import { createForm } from 'svelte-forms-lib';
	import {
		Form,
		TextField,
		RadioField,
		SubmitButton,
		FormError
	} from '$lib/components/form';

	//

	async function onSubmit(values: f.billing.bType) {
		try {
			// Creazione body
			const body: f.payment.pType = {
				paymentHash: $page.params.hash,
				billing: values
			};

			// Invio richiesta
			const res: f.payment.pResType = await post(
				fetch,
				endpoints.pay,
				body,
				headersAuth()
			);

			// Si va al pagamento se la risposta è positiva
			if (res.sessionUrl) {
				goto(res.sessionUrl);
			} else {
				throw new Error(
					'Could not create payment session, please try again later or contact admin if error persists'
				);
			}
		} catch (e) {
			setFormError(e);
		}
	}

	// Setting billing options
	const billingOptions = f.billing.bOptions;
	const radioValues = [
		{ value: billingOptions[0], label: 'Io' },
		{ value: billingOptions[1], label: 'Qualcun altro per me' },
		{ value: billingOptions[2], label: 'Attività commerciale' }
	];

	// Creating form
	const formContext = createForm({
		initialValues: f.billing.bValues,
		validationSchema: f.billing.bSchema,
		onSubmit
	});
	const { form } = formContext;

	// Dynamically updating form content
	// to ease form validation
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
	<h1>Dati di fatturazione</h1>

	<RadioField name="billingOption" items={radioValues} labelText="Chi paga?" />

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

		<hr />

		<TextField name="address.street" labelText="Indirizzo" type="text" />
		<TextField name="address.town" labelText="Città" type="text" />
		<div class="field-w30">
			<TextField name="address.province" labelText="Provincia" type="text" />
		</div>
		<div class="field-w50">
			<TextField name="address.cap" labelText="CAP" type="text" />
		</div>

		<FormError />

		<hr />

		<SubmitButton>Vai al pagamento</SubmitButton>
	{/if}
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
