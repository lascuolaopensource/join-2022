<script lang="ts" context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params, fetch, session, stuff }) {
		try {
			const paymentInfo = await req.getPaymentInfo(params.hash);

			// Redirecting if already confirmed
			if (paymentInfo.payment.confirmed) {
				return {
					status: 302,
					redirect: `/shared/payments/alreadyConfirmed`
				};
			}

			// Redirecting if expired
			if (Date.now() > Date.parse(paymentInfo.payment.expiration)) {
				return {
					status: 302,
					redirect: `/shared/payments/expired`
				};
			}

			//
			return {
				props: {
					paymentInfo
				}
			};
		} catch (e) {
			console.log(e.message, 'paymentNotExisting');
			return {
				status: 302,
				redirect: `/shared/payments/notExisting`
			};
		}
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { req } from '$lib/requestUtils';
	import { setFormError } from '$lib/components/form';
	import { f } from 'shared';
	import type { e } from 'shared';
	import { lsKeys } from '$lib/localStorageUtils';
	import { s } from '$lib/strings';

	import { createForm } from 'svelte-forms-lib';
	import {
		Form,
		TextField,
		RadioField,
		SubmitButton,
		FormError
	} from '$lib/components/form';

	import { Callout } from '$lib/components';

	//

	export let paymentInfo: e.pay.getPaymentInfo.Res;

	/**
	 * Form setup
	 */

	async function onSubmit(values: f.billing.bType) {
		try {
			// Si svuota il localstorage
			localStorage.removeItem(lsKeys.paymentForm);

			// Creazione body
			const body: f.payment.pType = {
				paymentHash: $page.params.hash,
				billing: values
			};

			// Invio richiesta
			const res = await req.pay($page.params.hash, body);

			// Si va al pagamento se la risposta è positiva
			if (res.sessionUrl) {
				await goto(res.sessionUrl);
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

	// Adding

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

	/**
	 * Preparing variables - Formatting strings
	 */

	// Formatter setup for price
	const formatter = new Intl.NumberFormat('it-IT', {
		style: 'currency',
		currency: 'EUR'
	});

	// Label for email field
	let emailLabel: string;
	$: if ($form.billingOption == billingOptions[2]) {
		emailLabel = 'PEC';
	} else {
		emailLabel = 'Email';
	}

	// Payment deadline
	const deadline = new Date(Date.parse(paymentInfo.payment.expiration));
</script>

<!--  -->

<h1>Pagamento</h1>

<Callout>
	{s.pay.callout}
</Callout>

<table>
	<tr>
		<th>Oggetto</th>
		<td>{paymentInfo.details.category} – {paymentInfo.details.title}</td>
	</tr>
	<tr>
		<th>Prezzo</th>
		<td>
			{formatter.format(paymentInfo.details.price)}
		</td>
	</tr>
	<tr>
		<th>Scadenza pagamento</th>
		<td>
			{deadline.toLocaleDateString('IT-it')}
		</td>
	</tr>
</table>

<div class="notes">
	<h2>{s.pay.info}</h2>
	<ul>
		<li>{s.pay.dataAgain}</li>
		<li>{s.pay.link}</li>
	</ul>
</div>

<Form {formContext} lsKey={lsKeys.paymentForm}>
	<hr />

	<!--  -->

	<h2>Dati di fatturazione</h2>

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
			<TextField
				name="company.sdi"
				labelText="Codice SDI (opzionale)"
				type="text"
			/>
		{/if}

		{#if $form.billingOption != billingOptions[0]}
			<TextField name="email" labelText={emailLabel} type="email" />
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

	td,
	th {
		padding: var(--s-1);
	}

	table {
		/* width: 100%; */
		border-collapse: collapse;
		margin-top: var(--s-3);
		margin-bottom: var(--s-3);
	}

	td,
	th,
	table {
		border: 1px solid gray;
	}

	th {
		width: auto;
		text-align: left;
	}

	h1 {
		margin-bottom: var(--s-3);
	}

	.notes {
		margin-bottom: var(--s-3);
	}
</style>
